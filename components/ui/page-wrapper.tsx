import { Copy } from "lucide-react";
import testTypes from "@/app/(preview)/(home)/data";
import Nav from "./header";

interface PageWrapperProps {
  children: React.ReactNode;
  variant:
    | "flashcards"
    | "quiz"
    | "match"
    | "true-or-false"
    | "fill-in-the-blank"
    | "multiple-choice";
  showVariantHeader?: boolean;
}

const PageWrapper = ({
  children,
  variant,
  showVariantHeader = true,
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
      <Nav icon={IconComponent} title={displayTitle} />

      {showVariantHeader && (
        <div className="flex items-center justify-center gap-2 pb-3">
          <div className="w-6 h-6 text-icon">
            <IconComponent
              className="w-6 h-6 text-icon"
              fill="currentColor"
              strokeWidth={1.5}
            />
          </div>

          <span className="text-nowrap text-xl font-medium">
            {displayTitle}
          </span>
        </div>
      )}

      {children}
    </section>
  );
};

export default PageWrapper;
