export const floatY = {
  animate: {
    y: [0, -24, 0],
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const floatRotate = {
  animate: {
    y: [0, -18, 0],
    rotate: [0, 2, -1, 0],
    transition: {
      duration: 10,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const heroOrbit = {
  animate: {
    x: [0, -28, 12, 0],
    y: [0, 24, -18, 0],
    transition: {
      duration: 14,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const shimmerX = {
  animate: {
    x: ["-10%", "8%", "-10%"],
    transition: {
      duration: 12,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const pulseGlow = {
  animate: {
    opacity: [0.35, 0.7, 0.35],
    scale: [1, 1.06, 1],
    transition: {
      duration: 7,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};
