"use client";

import FlashCards from "@/components/flash-cards";
import PageWrapper from "@/components/ui/page-wrapper";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function FlashCardsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
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
