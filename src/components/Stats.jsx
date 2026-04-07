import { motion } from "framer-motion";

const stats = [
  { value: "50+", label: "Projects" },
  { value: "100%", label: "Client Retention" },
  { value: "3x", label: "More Leads" },
];

export default function Stats() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="flex justify-center gap-12 flex-wrap">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-purple-400">
              {stat.value}
            </h2>
            <p className="text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}