export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const cardHover = {
  y: -10,
  scale: 1.01,
  transition: { duration: 0.24, ease: "easeOut" },
};
