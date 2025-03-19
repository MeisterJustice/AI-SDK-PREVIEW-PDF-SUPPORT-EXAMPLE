import testTypes from "@/app/(preview)/(home)/data";
import { ArrowLeft, ChevronDown, Copy } from "lucide-react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "./backdrop";
import { Button } from "./button";
import useSystemFunctions from "@/hooks/useSystemFunctions";

interface HeaderProps {
  icon?: LucideIcon;
  title?: string;
}

const dropdownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Nav = ({ icon, title }: HeaderProps) => {
  const { navigate } = useSystemFunctions();
  const [showDropdown, setShowDropdown] = useState(false);
  const IconComponent = icon || Copy;

  const displayTitle = title || "Flashcards";

  const otherTestTypes = testTypes.filter((type) => type.name !== displayTitle);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 border-b border-border">
      <div className="container mx-auto py-3 flex flex-row items-center gap-7">
        <div
          className="w-6 h-6 text-icon cursor-pointer"
          onClick={() => navigate.back()}
        >
          <ArrowLeft className="w-6 h-6 text-black dark:text-white" />
        </div>

        <div className="relative">
          <div
            role="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 mb-3 outline-none pt-2"
          >
            <div className="w-6 h-6 text-icon">
              <IconComponent
                className="w-6 h-6 text-icon"
                fill="currentColor"
                strokeWidth={1.5}
              />
            </div>
            <span className="text-nowrap text-xl font-medium">
              {displayTitle}
            </span>
            <div className="relative group">
              <div className="flex items-center">
                <ChevronDown className="h-4 w-4 cursor-pointer" />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showDropdown && (
              <>
                <Backdrop onClick={() => setShowDropdown(false)} />
                <motion.div
                  key="dropdown"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute left-0 w-56 bg-background border-2 border-largeCard shadow-md rounded-md p-1 transition-all z-50"
                >
                  {otherTestTypes.map((type) => (
                    <Link
                      key={type.id}
                      href={type.route}
                      className="flex items-center gap-2 p-2 hover:bg-accent rounded-sm text-sm cursor-pointer w-full"
                    >
                      <type.icon className="h-4 w-4 text-icon" />
                      <span>{type.name}</span>
                    </Link>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default memo(Nav);
