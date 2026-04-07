import { motion } from "framer-motion";

const businesses = [
  "Institutes",
  "Restaurants",
  "Gyms",
  "Clinics",
  "Bars",
  "Clubs",
  "Medical Stores",
  "Salons",
];

export default function BusinessTypes() {
  return (
    <section className="py-16 bg-black text-white px-6 text-center">
      <h2 className="text-3xl font-bold mb-8">
        Built for Every Growing Business
      </h2>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {businesses.map((b, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="px-6 py-2 rounded-full bg-white/10 border border-white/10"
          >
            {b}
          </motion.div>
        ))}
      </div>
    </section>
  );
}