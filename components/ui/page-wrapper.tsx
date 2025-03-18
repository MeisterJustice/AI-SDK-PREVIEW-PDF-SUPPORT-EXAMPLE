import { Copy } from "lucide-react";
import testTypes from "@/app/(preview)/(home)/data";

interface PageWrapperProps {
  children: React.ReactNode;
  variant?:
    | "flashcards"
    | "quiz"
    | "match"
    | "true-or-false"
    | "fill-in-the-blank"
    | "multiple-choice";
}

const PageWrapper = ({
  children,
  variant = "flashcards",
}: PageWrapperProps) => {
  const testType = testTypes.find(
    (type) => type.name.toLowerCase().replace(/\s+/g, "-") === variant
  );

  const IconComponent = testType?.icon || Copy;

  const displayTitle =
    testType?.name ||
    variant
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <section className="xl:min-h-[calc(100vh-6rem)] xl:flex xl:flex-col xl:justify-center">
      <div className="flex items-center justify-center gap-2 pb-3">
        <div className="w-6 h-6 text-icon">
          <IconComponent
            className="w-6 h-6 text-icon"
            fill="currentColor"
            strokeWidth={1.5}
          />
        </div>

        <span className="text-nowrap text-xl font-medium">{displayTitle}</span>
      </div>

      {children}
    </section>
  );
};

export default PageWrapper;
