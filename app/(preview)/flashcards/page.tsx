"use client";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import FlashCards from "@/components/flash-cards";
import PageWrapper from "@/components/ui/page-wrapper";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useFlashcardsActions from "@/store/flashcards/actions";
import Loader from "@/components/ui/loader";

export default function FlashCardsPage() {
  const { flashcardsState, appState } = useSystemFunctions();
  const { generateFlashcards } = useFlashcardsActions();
  const { flashcards, loading } = flashcardsState;

  useEffect(() => {
    if (appState.files.length > 0) {
      generateFlashcards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.files]);

  if (loading && flashcards.length === 0) {
    return <Loader text="Generating flashcards..." />;
  }

  return (
    <PageWrapper variant="flashcards">
      <FlashCards isLarge hideInput />
    </PageWrapper>
  );
}
