"use client";

import testTypes from "./data";
import PdfSelection from "./pdf-selection";
import TestOption from "./test-option";

export default function ChatWithFiles() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl lg:text-3xl font-bold">Finance Quiz 1</h1>

      <p className="text-muted-foreground py-4">
        Choose the type of test you want to take
      </p>

      <div className="flex flex-col xl:flex-row xl:justify-between gap-10 xl:gap-6">
        <div className="xl:w-3/4">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-3">
            {testTypes.map((testType) => (
              <TestOption testType={testType} key={testType.id} />
            ))}
          </div>
        </div>

        <div className="xl:w-1/4 bg-card rounded-lg p-3 xl:min-h-[500px]">
          <PdfSelection />
        </div>
      </div>
    </main>
  );
}
