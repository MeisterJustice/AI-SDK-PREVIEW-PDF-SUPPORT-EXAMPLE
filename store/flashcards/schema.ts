import { z } from "zod";

export const flashcardSchema = z.object({
  question: z
    .string()
    .describe(
      "The question on the front side of the flashcard. For fill-in-the-blank questions, use underscores '______' to indicate blanks."
    ),
  answer: z
    .string()
    .describe(
      "The complete answer on the back side of the flashcard. For fill-in-the-blank questions, provide the full answer including the values that go in the blanks."
    ),
});

export type Flashcard = z.infer<typeof flashcardSchema>;

export const flashcardsSchema = z.array(flashcardSchema).min(1).max(12);
