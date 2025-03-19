import { z } from "zod";

// Define the schema for a single match item (question or answer)
export const matchItemSchema = z.object({
  content: z.string().describe("The content of the question or answer"),
  type: z
    .enum(["question", "answer"])
    .describe("Whether this item is a question or an answer"),
  id: z.string().describe("Unique identifier for this item"),
  matchesWith: z
    .string()
    .describe(
      "ID of the matching item (question matches with answer and vice versa)"
    ),
});

export type MatchItem = z.infer<typeof matchItemSchema>;

// A pair consists of a question and its matching answer
export const matchPairSchema = z.object({
  question: z.string().describe("The question part of the pair"),
  answer: z.string().describe("The answer part of the pair"),
});

export type MatchPair = z.infer<typeof matchPairSchema>;

// The API will first generate pairs, then transform them into items
export const matchPairsSchema = z.array(matchPairSchema).length(6);

// The final array of match items (questions mixed with answers)
export const matchItemsSchema = z.array(matchItemSchema).length(12);
