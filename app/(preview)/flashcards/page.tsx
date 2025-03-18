"use client";
import { Loader2 } from "lucide-react";

import FlashCards from "@/components/flash-cards";
import PageWrapper from "@/components/ui/page-wrapper";
import useSystemFunctions from "@/hooks/useSystemFunctions";

export default function FlashCardsPage() {
  const { flashcardsState } = useSystemFunctions();

  const { flashcards, loading } = flashcardsState;

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
