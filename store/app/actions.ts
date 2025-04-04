import { toast } from "sonner";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { setFiles, setShowFileSelector } from ".";
import { setFlashcards } from "../flashcards";

const useAppActions = () => {
  const { dispatch, appState } = useSystemFunctions();

  const savePdfFiles = (files: File[]) => {
    dispatch(setFiles(files));
    dispatch(setFlashcards([]));
    toast.success("File saved");
  };

  const showFileInput = (show: boolean) => {
    dispatch(setShowFileSelector(show));
  };

  const loadExamplePdf = async () => {
    try {
      if (appState.files.length > 0) {
        return;
      }

      const response = await fetch("/example.pdf");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch example.pdf: ${response.status} ${response.statusText}`
        );
      }

      const blob = await response.blob();
      const file = new File([blob], "example.pdf", {
        type: "application/pdf",
      });

      dispatch(setFiles([file]));
    } catch (error) {
      console.error("Error loading example PDF:", error);
      toast.error("Failed to load example PDF. Please try again.");
    }
  };

  return {
    savePdfFiles,
    showFileInput,
    loadExamplePdf,
  };
};

export default useAppActions;
