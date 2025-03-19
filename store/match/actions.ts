import { toast } from "sonner";
import { experimental_useObject } from "ai/react";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { matchItemsSchema } from "./schema";
import { encodeFileAsBase64 } from "@/lib/utils";
import { setLoading, setMatchItems } from ".";

const useMatchActions = () => {
  const { dispatch, appState, matchState } = useSystemFunctions();

  const {
    submit,
    object: partialItems,
    isLoading: isGenerating,
  } = experimental_useObject({
    api: "/api/generate-match",
    schema: matchItemsSchema,
    initialValue: undefined,
    onError: (error) => {
      toast.error("Failed to generate matching items. Please try again.");
      dispatch(setLoading(false));
    },
    onFinish: ({ object }) => {
      dispatch(setMatchItems(object ?? []));
      dispatch(setLoading(false));
    },
  });

  const generateMatchItems = async () => {
    // Use provided files or get them from state
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
      toast.error("Failed to process matching items. Please try again.");
      dispatch(setLoading(false));
    }
  };

  // Reset the game by shuffling the cards but keeping the same content
  const shuffleCards = () => {
    if (matchState.items.length === 0) return;

    // Create a copy of the items and shuffle them
    const shuffled = [...matchState.items].sort(() => Math.random() - 0.5);
    dispatch(setMatchItems(shuffled));
    toast.info("Cards shuffled!");
  };

  return {
    generateMatchItems,
    shuffleCards,
    partialItems,
    isGenerating,
  };
};

export default useMatchActions;
