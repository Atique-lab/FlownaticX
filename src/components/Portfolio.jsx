import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";

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

  // Keyboard controls
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
      <section className="py-20 bg-black px-6 text-white">
        <h2 className="text-4xl text-center font-bold mb-12">
          Featured Projects
        </h2>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((item, i) => (
            <TiltCard key={i}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => openPopup(i)}
                className="relative overflow-hidden rounded-xl group h-[300px] cursor-pointer"
              >
                <img
                  src={item.img}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <p className="text-lg font-semibold">{item.title}</p>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* POPUP SLIDER */}
        {currentIndex !== null && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[999]">

            {/* IMAGE */}
            <motion.img
              key={items[currentIndex].img}
              src={items[currentIndex].img}
              alt=""
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-[90%] max-h-[80%] rounded-xl"
            />

            {/* TITLE */}
            <p className="absolute bottom-10 text-white text-lg">
              {items[currentIndex].title}
            </p>

            {/* CLOSE */}
            <button
              onClick={closePopup}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              ✕
            </button>

            {/* PREV */}
            <button
              onClick={prevSlide}
              className="absolute left-6 text-white text-4xl"
            >
              ‹
            </button>

            {/* NEXT */}
            <button
              onClick={nextSlide}
              className="absolute right-6 text-white text-4xl"
            >
              ›
            </button>
          </div>
        )}
      </section>
    </ScrollReveal>
  );
}