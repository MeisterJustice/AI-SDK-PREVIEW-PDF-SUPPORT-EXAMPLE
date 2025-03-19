import {
  matchPairSchema,
  matchPairsSchema,
  matchItemsSchema,
  MatchPair,
} from "@/store/match/schema";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export const maxDuration = 60;

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Transform match pairs into randomized match items
function pairsToItems(pairs: MatchPair[]) {
  const items = [];

  for (const pair of pairs) {
    const questionId = uuidv4();
    const answerId = uuidv4();

    items.push({
      content: pair.question,
      type: "question" as const,
      id: questionId,
      matchesWith: answerId,
    });

    items.push({
      content: pair.answer,
      type: "answer" as const,
      id: answerId,
      matchesWith: questionId,
    });
  }

  // Shuffle the items to randomize questions and answers
  return shuffleArray(items);
}

export async function POST(req: Request) {
  try {
    const { files } = await req.json();
    const firstFile = files[0].data;

    // Generate 6 pairs using generateObject instead of streamObject
    const result = await generateObject({
      model: google("gemini-1.5-pro-latest"),
      messages: [
        {
          role: "system",
          content: `You are an education assistant. Your job is to take a document and create 6 matching pairs based on the content. 
          
Each pair should have a question and an answer that directly corresponds to it. The questions should be concise but specific enough that they can only match with one answer. Answers should be clear and direct.

Create a variety of question types:
1. Factual questions about specific information
2. Definitions of terms from the document
3. Cause and effect relationships
4. Key concepts and their explanations

Make sure each question has only one correct answer among the set, and each answer matches only one question.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Create 6 matching pairs (questions and answers) based on this document. Make sure each question has a clear, specific answer that matches only with it.",
            },
            {
              type: "file",
              data: firstFile,
              mimeType: "application/pdf",
            },
          ],
        },
      ],
      schema: matchPairsSchema,
    });

    // Get the pairs
    const pairs = result.object;

    // Transform the pairs into items (questions and answers separately with matching IDs)
    const items = pairsToItems(pairs);

    // Return the items as JSON
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error generating match items:", error);
    return NextResponse.json(
      { error: "Failed to generate match items" },
      { status: 500 }
    );
  }
}
