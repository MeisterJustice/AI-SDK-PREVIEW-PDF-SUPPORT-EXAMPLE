import { Loader2 } from "lucide-react";

const Loader = ({ text }: { text: string }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 h-full absolute top-0 left-0 right-0 bottom-0 z-50 bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-icon" />
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default Loader;
