import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInBlur, fadeInUp, staggerContainer } from "../animations/fade";
import { shimmerX } from "../animations/scroll";
import { SectionHeading } from "./shared/SectionHeading";

const projects = [
  {
    title: "Growth OS Landing System",
    description:
      "A startup-style homepage with pricing, onboarding narrative, and a motion-led hero.",
    stats: "41% higher click-through",
    tag: "Launch design",
  },
  {
    title: "Conversion Dashboard Experience",
    description:
      "A premium analytics front with layered cards, trust signals, and compact storytelling.",
    stats: "3.2x more demo intent",
    tag: "SaaS narrative",
  },
  {
    title: "Offer Funnel Refresh",
    description:
      "A service-led site reframed as a product funnel with stronger CTA and lifecycle positioning.",
    stats: "28% better lead quality",
    tag: "Lifecycle UX",
  },
];

export default function Projects() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section id="projects" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10">
      <motion.div
        aria-hidden="true"
        style={{ y }}
        className="absolute left-[-8rem] top-12 h-72 w-72 rounded-full bg-cyan-500/10 blur-[130px]"
      />
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeInBlur}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHeading
            eyebrow="Projects"
            title="Case study framing with deeper motion and stronger premium cues"
            description="These cards now carry richer overlays, accent lighting, and micro-interactions so the section reads more like a product showcase."
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={fadeInUp}
              whileHover={{ y: -10, rotateX: 4, rotateY: index === 1 ? 0 : index === 0 ? 3 : -3 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="group perspective-[1600px]"
            >
              <div className="glass-panel noise-overlay surface-line relative overflow-hidden rounded-[2rem]">
                <motion.div
                  variants={shimmerX}
                  animate="animate"
                  className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-500/20 via-slate-950 to-violet-500/20">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    className="absolute inset-6 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/[0.14] via-transparent to-white/[0.03]"
                  />
                  <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs text-slate-200">
                    {project.tag}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/10 bg-slate-950/65 p-4 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
                      Impact
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {project.stats}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                    Case {index + 1}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-300">
                    {project.description}
                  </p>
                  <div className="mt-6 flex items-center gap-3 text-sm text-slate-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Product-style interface system with refined motion
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
