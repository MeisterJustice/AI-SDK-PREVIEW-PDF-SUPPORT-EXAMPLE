const questionsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.7,
    },
  },
};

const questionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

const optionsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const optionVariants = {
  hidden: { x: -50, opacity: 0, backgroundColor: "transparent" },
  visible: (custom: { status: string; isDark: boolean }) => ({
    x: 0,
    opacity: 1,
    backgroundColor:
      custom.status === "correct"
        ? custom.isDark
          ? "rgb(21 128 61 / 0.5)"
          : "#DCFCE7"
        : custom.status === "incorrect"
        ? custom.isDark
          ? "rgb(185 28 28 / 0.5)"
          : "#fee2e2"
        : "transparent",
    transition: {
      x: { duration: 0.5 },
      opacity: { duration: 0.5 },
      backgroundColor: { delay: 0.5, duration: 0.8 },
    },
  }),
};

const iconVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
};

export {
  questionsContainerVariants,
  questionVariants,
  optionsContainerVariants,
  optionVariants,
  iconVariants,
};
