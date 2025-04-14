/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-surface': '#ffffff',
        'dark-surface': '#0f172a',
        'light-text': '#1e293b',
        'dark-text': '#f1f5f9',
        'light-primary': '#1e40af',
        'dark-primary': '#0ea5e9',
        'light-border': '#e2e8f0',
        'dark-border': '#334155',
        'light-textMuted': '#64748b',
        'dark-textMuted': '#94a3b8',
      }
    }
  },
  plugins: [],
}

