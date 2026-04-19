export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-slate-300">{description}</p>
    </div>
  );
}
