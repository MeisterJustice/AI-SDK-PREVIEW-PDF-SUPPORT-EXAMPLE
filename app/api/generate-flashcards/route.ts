import { flashcardSchema, flashcardsSchema } from "@/store/flashcards/schema";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { files } = await req.json();
  const firstFile = files[0].data;

  const prompt = `You are an education assistant. Your job is to take a document and create a set of 12 diverse flashcards based on the content.

Each flashcard should have a question on one side and the answer on the other. Create various question types:

1. For fill-in-the-blank questions: Include "______" (6 underscores) in the question text to indicate where answers should go. Example: "A whale weighs ________ when it is under water but _______ when it is on the surface. The answers for this should be of this format: 300kg and 100kg. No need to repeat the question in the answer."

2. For factual questions: Ask specific questions about facts, dates, locations, etc based on the content of the document. Example: "Manchester United has won the FA Cup a total of 12 times. Where was the location of their last win?"

3. For conceptual questions: Ask about definitions, explanations, processes, etc based on the content of the document.

Include a good mix of these question types. Make questions challenging but clear. Answers should be detailed enough to fully explain the concept.`;

  const result = streamObject({
    model: google("gemini-1.5-pro-latest"),
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Create a set of diverse flashcards based on this document. Include various question types including fill-in-the-blank questions with '______' (6 underscores) to indicate blanks.",
          },
          {
            type: "file",
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
    schema: flashcardSchema,
    output: "array",
    onFinish: ({ object }) => {
      const res = flashcardsSchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }
    },
  });

  return result.toTextStreamResponse();
}
