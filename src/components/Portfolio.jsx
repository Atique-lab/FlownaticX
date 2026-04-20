import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TiltCard from "./TiltCard";
import ScrollReveal, { cardVariant, premiumEase, staggerContainer, viewportOnce } from "./ScrollReveal";

import p1 from "../assets/projects/project1.jpg";
import p2 from "../assets/projects/project2.jpg";
import p3 from "../assets/projects/project3.jpg";
import p4 from "../assets/projects/project4.jpg";
import p5 from "../assets/projects/project5.jpg";
import p6 from "../assets/projects/project6.jpg";
import p7 from "../assets/projects/project7.jpg";

const items = [
  { img: p1, title: "Landing Page UI" },
  { img: p2, title: "Dashboard Hero" },
  { img: p3, title: "Design for Online Ads" },
  { img: p4, title: "Automation Dashboard" },
  { img: p5, title: "Institutes Poster" },
  { img: p6, title: "Restaurant Ads" },
  { img: p7, title: "Gym Poster" },
];

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(null);

  const openPopup = (index) => setCurrentIndex(index);
  const closePopup = () => setCurrentIndex(null);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % items.length);

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? items.length - 1 : prev - 1
    );

  useEffect(() => {
    const handleKey = (e) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") closePopup();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  return (
    <ScrollReveal>
      <section className="px-6 py-20 text-white">
        <h2 className="section-heading mb-12 text-center text-4xl font-bold">
          Featured Projects
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3"
        >
          {items.map((item, i) => (
            <motion.div key={item.title} variants={cardVariant}>
              <TiltCard>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.28, ease: premiumEase }}
                  onClick={() => openPopup(i)}
                  className="glass-panel premium-surface premium-card-hover group relative h-[300px] cursor-pointer overflow-hidden rounded-[1.75rem]"
                >
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.45, ease: premiumEase }}
                    className="h-full w-full object-cover object-center"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/18 to-cyan-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 translate-y-5 px-6 pb-6 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-lg font-semibold">{item.title}</p>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {currentIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: premiumEase }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/95 px-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.34, ease: premiumEase }}
              className="glass-panel premium-surface relative w-full max-w-5xl rounded-[2rem] p-6 md:p-10"
            >
              <motion.img
                key={items[currentIndex].img}
                src={items[currentIndex].img}
                alt={items[currentIndex].title}
                initial={{ scale: 0.965, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.38, ease: premiumEase }}
                className="max-h-[70vh] w-full rounded-[1.5rem] object-cover"
              />

              <p className="mt-5 text-center text-lg text-slate-100">
                {items[currentIndex].title}
              </p>

              <button
                onClick={closePopup}
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-2xl text-white transition hover:bg-slate-800"
              >
                {"\u2715"}
              </button>

              <button
                onClick={prevSlide}
                className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-4xl text-white transition hover:bg-slate-800"
              >
                {"\u2039"}
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-4xl text-white transition hover:bg-slate-800"
              >
                {"\u203A"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </section>
    </ScrollReveal>
  );
}
