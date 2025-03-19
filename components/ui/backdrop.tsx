import { motion } from "framer-motion";

interface IBackdrop {
  onClick: () => void;
}

const Backdrop = ({ onClick }: IBackdrop) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 bg-transparent z-10"
    onClick={onClick}
  />
);
export default Backdrop;
