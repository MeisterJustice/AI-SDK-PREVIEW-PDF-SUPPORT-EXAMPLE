"use client";

import { Copy } from "lucide-react";
import FlashCards from "@/components/flash-cards";

export default function FlashCardsPage() {
  return (
    <section className="xl:min-h-[calc(100vh-6rem)] xl:flex xl:flex-col xl:justify-center">
      <div className="flex items-center justify-center gap-2 pb-3">
        <div className="w-6 h-6 text-icon">
          <Copy
            className="w-6 h-6 text-icon"
            fill="currentColor"
            strokeWidth={1.5}
          />
        </div>

        <span className="text-nowrap text-xl font-medium">Flash Cards</span>
      </div>

      <FlashCards isLarge />
    </section>
  );
}
