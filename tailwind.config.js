export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#060816",
        panel: "#0f172a",
        "panel-strong": "#101827",
        accent: "#60a5fa",
        secondary: "#8b5cf6",
      },
      fontFamily: {
        sans: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 25px 80px rgba(37, 99, 235, 0.25)",
        panel: "0 20px 60px rgba(2, 8, 23, 0.45)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(96,165,250,0.16), transparent 38%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.14), transparent 28%), linear-gradient(180deg, rgba(15,23,42,0.95), rgba(2,6,23,1))",
      },
    },
  },
  plugins: [],
};
