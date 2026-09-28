/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // SoftFix brand identity (2026 guideline, colour palette slide)
        brand: {
          blue: '#004BF6',
          cyan: '#00F2E4',
          navy: '#0E1B2B',
          sky: '#4D8BFF', // blue lifted for text on dark (AA on canvas)
        },
        canvas: '#05080F',
        surface: {
          1: '#0A101C',
          2: '#0E1624',
          3: '#132033',
        },
        ink: {
          DEFAULT: '#D7E2EA',
          muted: '#9AA8BA',
          subtle: '#6B7A90',
        },
        line: 'rgba(215, 226, 234, 0.12)',
      },
      fontFamily: {
        display: ['Kanit', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #004BF6 0%, #00F2E4 100%)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) rotate(var(--r, 0deg))' },
          '50%': { transform: 'translate3d(var(--dx, 40px), var(--dy, -30px), 0) rotate(var(--r, 0deg))' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee var(--duration, 40s) linear infinite',
        drift: 'drift var(--t, 14s) ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.2, 0.6, 0.3, 1) infinite',
      },
    },
  },
  plugins: [],
};
