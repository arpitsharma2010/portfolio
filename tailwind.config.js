/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#01050e",
        nebula: "#031320",
        plasma: "#0b6fd0", // SUNY Buffalo blue
        ion: "#14c1a5", // DNB mint
        flare: "#f97316", // SGBAU orange
        aurora: "#4ec0ff",
        holo: "#0f1b2d",
        "panel-dark": "rgba(3, 14, 22, 0.8)",
        "panel-light": "rgba(255, 255, 255, 0.08)",
        "text-mute": "#9bc3ff",
        "brand-emerald": "#0a4f4a",
        "brand-sapphire": "#005bbb",
        "brand-amber": "#ffb347",
      },
      boxShadow: {
        glow: "0 0 45px rgba(20, 193, 165, 0.35)",
        "glow-sm": "0 0 18px rgba(11, 111, 208, 0.35)",
      },
      backgroundImage: {
        "grid-nebula":
          "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "orbital":
          "radial-gradient(circle at 20% 20%, rgba(20, 193, 165, 0.28), transparent 55%), radial-gradient(circle at 80% 0%, rgba(0, 91, 187, 0.22), transparent 45%), radial-gradient(circle at 40% 80%, rgba(249, 115, 22, 0.18), transparent 35%)",
      },
      keyframes: {
        "slow-pulse": {
          "0%, 100%": { opacity: 0.35, transform: "scale(0.98)" },
          "50%": { opacity: 0.8, transform: "scale(1.02)" },
        },
        "orbit-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "pulse-holo": "slow-pulse 10s ease-in-out infinite",
        "orbit-spin": "orbit-spin 40s linear infinite",
      },
    },
  },
  plugins: [],
};
