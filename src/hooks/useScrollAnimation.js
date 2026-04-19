import { useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation({
  inView = { once: true, amount: 0.25 },
  offset = ["start end", "end start"],
  yRange = [32, -32],
  opacityRange = [0.35, 1, 0.35],
} = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, inView);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  const yInput = yRange.length === 3 ? [0, 0.5, 1] : [0, 1];
  const opacityInput =
    opacityRange.length === 3 ? [0, 0.5, 1] : [0, 1];
  const y = useTransform(scrollYProgress, yInput, yRange);
  const opacity = useTransform(scrollYProgress, opacityInput, opacityRange);

  return { ref, isInView, scrollYProgress, y, opacity };
}
