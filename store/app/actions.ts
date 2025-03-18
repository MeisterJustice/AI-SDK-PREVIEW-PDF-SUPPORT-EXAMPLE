import { toast } from "sonner";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { setFiles, setShowFileSelector } from ".";

const useAppActions = () => {
  const { dispatch } = useSystemFunctions();

  const savePdfFiles = (files: File[]) => {
    dispatch(setFiles(files));
    toast.success("File saved");
  };

  const showFileInput = (show: boolean) => {
    dispatch(setShowFileSelector(show));
  };

  return {
    savePdfFiles,
    showFileInput,
  };
};

export default useAppActions;
