import CTA from "../components/CTA";
import ContactSection from "../components/Contact";

export default function ContactPage() {
  return (
    <>
      <section className="px-4 pb-8 pt-36 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Contact</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Tell us what you’re launching and we’ll shape the right frontend sprint.
          </h1>
        </div>
      </section>
      <ContactSection />
      <CTA />
    </>
  );
}
