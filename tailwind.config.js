/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Professional Navy/Slate Palette
        void: "#080b12", // Very dark slate (almost black)
        nebula: "#0f172a", // Tailwind slate-900
        plasma: "#1d4ed8", // Tailwind blue-700
        ion: "#0f766e", // Tailwind teal-700
        flare: "#b45309", // Tailwind amber-700
        aurora: "#38bdf8", // Tailwind sky-400 (for subtle highlights)
        holo: "#1e293b", // Tailwind slate-800
        
        "panel-dark": "rgba(15, 23, 42, 0.8)", // slate-900 with opacity
        "panel-light": "rgba(255, 255, 255, 0.05)",
        "text-mute": "#94a3b8", // slate-400
        
        "brand-emerald": "#047857",
        "brand-sapphire": "#1e40af",
        "brand-amber": "#d97706",
      },
      boxShadow: {
        // Soft, professional shadows instead of neon glow
        glow: "0 10px 25px -5px rgba(15, 23, 42, 0.3)",
        "glow-sm": "0 4px 6px -1px rgba(15, 23, 42, 0.2)",
      },
      backgroundImage: {
        "grid-nebula":
          "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        "orbital":
          "radial-gradient(circle at 50% 0%, rgba(30, 64, 175, 0.1), transparent 50%)",
      },
      keyframes: {
        "slow-pulse": {
          "0%, 100%": { opacity: 0.8 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        "pulse-holo": "slow-pulse 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
