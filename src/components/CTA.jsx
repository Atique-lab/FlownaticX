export default function CTA() {
  return (
    <section className="py-20 px-6 text-center bg-gradient-to-r from-purple-900 to-blue-900 text-white">
      <h2 className="text-4xl font-bold">
        Ready to Scale Your Admissions?
      </h2>

      <p className="mt-4 text-gray-300">
        Build a system that brings students automatically.
      </p>

      <button
        onClick={() =>
          window.open("https://wa.me/918799783853", "_blank")
        }
        className="mt-8 px-8 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
      >
        Start Your Growth Journey
      </button>
    </section>
  );
}