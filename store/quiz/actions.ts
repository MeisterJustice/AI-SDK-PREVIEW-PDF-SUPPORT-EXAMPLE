import { toast } from "sonner";
import { experimental_useObject } from "ai/react";
import { z } from "zod";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { questionsSchema } from "./schema";
import { encodeFileAsBase64 } from "@/lib/utils";
import { setLoading, setQuestions, setTitle } from ".";

const useQuizActions = () => {
  const { dispatch, appState } = useSystemFunctions();

  const {
    submit,
    object: partialQuestions,
    isLoading: isGenerating,
  } = experimental_useObject({
    api: "/api/generate-quiz",
    schema: questionsSchema,
    initialValue: undefined,
    onError: (error) => {
      toast.error("Failed to generate quiz. Please try again.");
    },
    onFinish: ({ object }) => {
      dispatch(setQuestions(object ?? []));
      dispatch(setLoading(false));
    },
  });

  const generateQuestions = async (providedFiles?: File[]) => {
    // Use provided files or get them from state
    const files = providedFiles || (appState.files as File[]) || [];

    if (files.length === 0) {
      toast.error("No files selected.");
      return;
    }

    dispatch(setLoading(true));

    try {
      const encodedFiles = await Promise.all(
        files.map(async (file: File) => ({
          name: file.name,
          type: file.type,
          data: await encodeFileAsBase64(file),
        }))
      );

      submit({ files: encodedFiles });

      await _generateQuizTitle(encodedFiles[0].name);
    } catch (error) {
      console.error("Error encoding files:", error);
      toast.error("Failed to process questions. Please try again.");
      dispatch(setLoading(false));
    }
  };

  const _generateQuizTitle = async (fileName: string): Promise<string> => {
    try {
      const response = await fetch("/api/generate-quiz-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate title: ${response.status}`);
      }

      const data = await response.json();
      const title = data.title || "Quiz";
      dispatch(setTitle(title));

      return title;
    } catch (error) {
      console.error("Error generating quiz title:", error);
      return "Quiz";
    }
  };

  return { generateQuestions };
};

export default useQuizActions;
