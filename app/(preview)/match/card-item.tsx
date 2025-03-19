import { motion } from "framer-motion";
import { MatchItem } from "@/store/match/schema";
import { cn } from "@/lib/utils";

interface CardItemProps {
  item: MatchItem;
  isHidden: boolean;
  status: string;
  selectCard: (id: string) => void;
}

const CardItem = ({ item, isHidden, status, selectCard }: CardItemProps) => {
  return (
    <motion.div
      key={item.id}
      layout
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        opacity: isHidden ? 0 : 1,
        scale: isHidden ? 0.8 : 1,
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "cursor-pointer rounded-lg p-6 flex items-center text-center shadow-md min-h-[150px]",
        status === "matched" ? "invisible" : "visible",
        status === "active"
          ? "bg-blue-100 dark:bg-blue-900 border-2 border-blue-500"
          : "bg-card"
      )}
      onClick={() => !isHidden && selectCard(item.id)}
    >
      <div className="font-medium">{item.content}</div>
    </motion.div>
  );
};

export default CardItem;
