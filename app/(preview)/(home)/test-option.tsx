import Link from "next/link";
import testTypes from "./data";

const TestOption = ({ testType }: { testType: (typeof testTypes)[0] }) => {
  return (
    <Link href={testType.route} key={testType.id}>
      <div className="py-3 px-14 rounded-lg bg-card text-card-foreground flex flex-col items-center justify-center gap-3 hover:bg-muted-foreground transition-all duration-300">
        <div className="w-6 h-6 text-icon">
          <testType.icon
            className="w-6 h-6 text-icon"
            fill="currentColor"
            strokeWidth={1.5}
          />
        </div>
        <span className="text-nowrap">{testType.name}</span>
      </div>
    </Link>
  );
};

export default TestOption;
