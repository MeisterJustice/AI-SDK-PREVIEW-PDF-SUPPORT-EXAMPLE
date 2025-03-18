import { toast } from "sonner";
import { experimental_useObject } from "ai/react";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { flashcardsSchema } from "./schema";
import { encodeFileAsBase64 } from "@/lib/utils";
import { setLoading, setFlashcards } from ".";

const useFlashcardsActions = () => {
  const { dispatch, appState } = useSystemFunctions();

  const {
    submit,
    object: partialFlashcards,
    isLoading: isGenerating,
  } = experimental_useObject({
    api: "/api/generate-flashcards",
    schema: flashcardsSchema,
    initialValue: undefined,
    onError: (error) => {
      toast.error("Failed to generate flashcards. Please try again.");
      dispatch(setLoading(false));
    },
    onFinish: ({ object }) => {
      dispatch(setFlashcards(object ?? []));
      dispatch(setLoading(false));
    },
  });

  const generateFlashcards = async () => {
    const files = appState.files;

    if (files.length === 0) {
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
    } catch (error) {
      console.error("Error encoding files:", error);
      toast.error("Failed to process flashcards. Please try again.");
      dispatch(setLoading(false));
    }
  };

  return {
    generateFlashcards,
    partialFlashcards,
    isGenerating,
  };
};

export default useFlashcardsActions;
