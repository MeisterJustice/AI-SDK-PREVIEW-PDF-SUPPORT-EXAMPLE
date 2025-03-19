import { Loader2 } from "lucide-react";

const Loader = ({ text }: { text: string }) => {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center gap-3 h-full">
      <Loader2 className="h-10 w-10 animate-spin text-icon" />
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default Loader;
