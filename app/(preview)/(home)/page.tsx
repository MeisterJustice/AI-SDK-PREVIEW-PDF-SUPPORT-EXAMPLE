"use client";

import { useEffect } from "react";
import FlashCards from "@/components/flash-cards";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useFlashcardsActions from "@/store/flashcards/actions";
import testTypes from "./data";
import TestOption from "./test-option";
import Loader from "@/components/ui/loader";

export default function Home() {
  const { flashcardsState, appState } = useSystemFunctions();
  const { generateFlashcards } = useFlashcardsActions();
  const { flashcards, loading } = flashcardsState;

  useEffect(() => {
    generateFlashcards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.files]);

  if (loading && flashcards.length === 0) {
    return <Loader text="Generating the best content for you..." />;
  }

  return (
    <section>
      <h1 className="text-2xl lg:text-3xl font-bold">Finance Quiz 1</h1>

      <p className="pt-3">Choose the type of test you want to take</p>

      <div className="flex flex-col gap-10 pt-10">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-3">
          {testTypes.map((testType) => (
            <TestOption testType={testType} key={testType.id} />
          ))}
        </div>

        <FlashCards />
      </div>
    </section>
  );
}
