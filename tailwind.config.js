/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#010311",
        nebula: "#050a1f",
        plasma: "#a855f7",
        ion: "#38f9d7",
        flare: "#ff8ac0",
        aurora: "#4cc9ff",
        holo: "#1f2937",
        "panel-dark": "rgba(7, 12, 31, 0.75)",
        "panel-light": "rgba(255, 255, 255, 0.08)",
        "text-mute": "#a5b4fc",
      },
      boxShadow: {
        glow: "0 0 40px rgba(56, 249, 215, 0.35)",
        "glow-sm": "0 0 15px rgba(168, 85, 247, 0.35)",
      },
      backgroundImage: {
        "grid-nebula":
          "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "orbital":
          "radial-gradient(circle at 20% 20%, rgba(76,201,255,0.25), transparent 55%), radial-gradient(circle at 80% 0%, rgba(168,85,247,0.2), transparent 45%), radial-gradient(circle at 30% 80%, rgba(248,113,113,0.15), transparent 35%)",
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
