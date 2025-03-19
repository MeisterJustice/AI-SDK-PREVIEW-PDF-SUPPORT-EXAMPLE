"use client";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import FlashCards from "@/components/flash-cards";
import PageWrapper from "@/components/ui/page-wrapper";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useFlashcardsActions from "@/store/flashcards/actions";

export default function FlashCardsPage() {
  const { flashcardsState, appState } = useSystemFunctions();
  const { generateFlashcards } = useFlashcardsActions();
  const { flashcards, loading } = flashcardsState;

  useEffect(() => {
    generateFlashcards();
  }, [appState.files]);

  if (loading || flashcards.length === 0) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-icon" />
      </div>
    );
  }

  return (
    <PageWrapper variant="flashcards">
      <FlashCards isLarge hideInput />
    </PageWrapper>
  );
}
