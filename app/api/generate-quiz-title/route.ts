import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { fileName } = await req.json();

    if (!fileName) {
      return NextResponse.json(
        { error: "File name is required" },
        { status: 400 }
      );
    }

    const result = await generateObject({
      model: google("gemini-1.5-flash-latest"),
      schema: z.object({
        title: z
          .string()
          .describe(
            "A max three word title for the quiz based on the file provided as context"
          ),
      }),
      prompt:
        "Generate a title for a quiz based on the following (PDF) file name. Try and extract as much info from the file name as possible. If the file name is just numbers or incoherent, just return quiz.\n\n " +
        fileName,
    });

    return NextResponse.json({ title: result.object.title });
  } catch (error) {
    console.error("Error generating quiz title:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz title" },
      { status: 500 }
    );
  }
}
