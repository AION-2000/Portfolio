/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#0A0503', // Almost black
          900: '#120C08', // IDE Background
          800: '#1F1611', // Sidebar/Panel
          700: '#2E2018', // Borders
        },
        latte: {
          100: '#EBE0D6', // Primary Text
          200: '#DCC5B5', // Secondary
          300: '#C0A08C',
          400: '#A6826C', // Muted Text
          500: '#8C6854', // Comments
        },
        accent: {
          green: '#4CAF50', // Success/String
          orange: '#E67E22', // Keywords
          blue: '#2196F3', // Functions
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #2E2018 1px, transparent 1px), linear-gradient(to bottom, #2E2018 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}