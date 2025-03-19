import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/ui/page-wrapper";
import Image from "next/image";

const StartGame = ({ handleStartGame }: { handleStartGame: () => void }) => {
  return (
    <PageWrapper variant="match" showVariantHeader={false}>
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <Image src="/match.webp" alt="Match Game" width={150} height={150} />

        <h3 className="text-2xl font-bold">Ready to play?</h3>

        <p className="text-sm text-gray-500 text-center w-1/2">
          Match all the terms with their definitions as quickly as possible.
          Avoid incorrect matches. They add extra time!
        </p>

        <Button
          variant="outline"
          className="w-1/2 h-14"
          onClick={handleStartGame}
        >
          Start Game
        </Button>
      </div>
    </PageWrapper>
  );
};

export default StartGame;
