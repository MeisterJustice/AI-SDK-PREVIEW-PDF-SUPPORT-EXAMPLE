"use client";

import FlashCards from "@/components/flash-cards";
import PageWrapper from "@/components/ui/page-wrapper";

export default function FlashCardsPage() {
  return (
    <PageWrapper variant="flashcards">
      <FlashCards isLarge />
    </PageWrapper>
  );
}
