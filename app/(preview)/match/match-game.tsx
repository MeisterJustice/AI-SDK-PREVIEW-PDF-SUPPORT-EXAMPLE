import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import PageWrapper from "@/components/ui/page-wrapper";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useMatchActions from "@/store/match/actions";
import { Button } from "@/components/ui/button";
import CardItem from "./card-item";
import useAppActions from "@/store/app/actions";

interface MatchGameProps {
  gameCompleted: boolean;
  handleCompleteGame: (completed: boolean) => void;
}

export default function MatchGame({
  gameCompleted,
  handleCompleteGame,
}: MatchGameProps) {
  const { matchState } = useSystemFunctions();
  const { generateMatchItems, shuffleCards, isGenerating } = useMatchActions();
  const { showFileInput } = useAppActions();

  const [activeItems, setActiveItems] = useState<string[] | null>(null);
  const [matchedItems, setMatchedItems] = useState<string[]>([]);

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
    handleCompleteGame(false);
    showFileInput(true);
    generateMatchItems();
  };

  const getCardStatus = (id: string) => {
    if (activeItems && activeItems.includes(id)) return "active";
    return "idle";
  };

  useEffect(() => {
    if (matchedItems.length > 0 && matchedItems.length === items.length) {
      handleCompleteGame(true);
      showFileInput(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedItems]);

  useEffect(() => {
    if (!gameCompleted) {
      setActiveItems(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameCompleted]);

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
