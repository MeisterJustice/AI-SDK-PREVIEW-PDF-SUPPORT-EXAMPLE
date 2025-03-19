"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, RefreshCw } from "lucide-react";
import PageWrapper from "@/components/ui/page-wrapper";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useMatchActions from "@/store/match/actions";
import { Button } from "@/components/ui/button";
import CardItem from "./card-item";
import Result from "@/components/result";
import useAppActions from "@/store/app/actions";

export default function MatchPage() {
  const { matchState, appState } = useSystemFunctions();
  const { generateMatchItems, shuffleCards, isGenerating } = useMatchActions();
  const { showFileInput } = useAppActions();

  const [activeItems, setActiveItems] = useState<string[] | null>(null);
  const [matchedItems, setMatchedItems] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);

  const { items } = matchState;

  const handleSelectCard = (id: string) => {
    if (activeItems && activeItems.length > 0) {
      const matchesWithActiveItem = hasAMatch(id);

      if (matchesWithActiveItem) {
        updateActiveItems(id);
      } else {
        setActiveItems(null);
      }
    } else {
      setActiveItems([...(activeItems || []), id]);
    }
  };

  const updateActiveItems = (id: string) => {
    if (!activeItems) return;

    setActiveItems([...(activeItems || []), id]);

    setTimeout(() => {
      setMatchedItems([...matchedItems, id, activeItems[0]]);

      setTimeout(() => {
        setActiveItems(null);
      }, 100);
    }, 200);
  };

  const hasAMatch = (id: string) => {
    const incomingItem = items.find((item) => item.id === id);
    const matchesWithAnyActiveItem = activeItems?.some((item) => {
      const activeItem = items.find((_item) => _item.id === item);

      return (
        incomingItem?.matchesWith === activeItem?.id ||
        activeItem?.matchesWith === incomingItem?.id
      );
    });

    if (!matchesWithAnyActiveItem) return false;

    return matchesWithAnyActiveItem;
  };

  const handleRestart = () => {
    setActiveItems(null);
    setGameCompleted(false);
    showFileInput(true);
    generateMatchItems();
  };

  const getCardStatus = (id: string) => {
    if (activeItems && activeItems.includes(id)) return "active";
    return "idle";
  };

  useEffect(() => {
    generateMatchItems();
  }, [appState.files]);

  useEffect(() => {
    if (matchedItems.length === items.length) {
      setGameCompleted(true);
      showFileInput(false);
    }
  }, [matchedItems]);

  if (isGenerating || matchState.items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-icon" />
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <Result
        numberOfCorrectAnswers={matchedItems.length / 2}
        numberOfQuestions={matchedItems.length / 2}
        restart={handleRestart}
      />
    );
  }

  return (
    <PageWrapper variant="match" showVariantHeader={false}>
      <div className="mt-8 lg:mt-16">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Match Game</h1>

          <p className="text-sm mb-4 text-center">
            Match each question with its correct answer by selecting pairs of
            cards.
          </p>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={shuffleCards}
              disabled={gameCompleted || isGenerating || items.length === 0}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Shuffle Cards
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRestart}
              disabled={isGenerating || items.length === 0}
            >
              Restart Game
            </Button>
          </div>
        </div>

        {gameCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-8 text-center"
          >
            <p className="text-lg font-bold">Congratulations! 🎉</p>
            <p>You've matched all the pairs correctly!</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => {
            const status = getCardStatus(item.id);
            const isHidden = matchedItems.includes(item.id);

            return (
              <CardItem
                key={item.id}
                item={item}
                isHidden={isHidden}
                status={status}
                selectCard={handleSelectCard}
              />
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
