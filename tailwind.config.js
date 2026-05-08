/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cabinet Grotesk"', '"DM Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      colors: {
        ink: {
          950: '#080C12',
          900: '#0D1117',
          800: '#131A24',
          700: '#1C2636',
          600: '#243040',
          500: '#2E3C50',
        },
        ash: {
          400: '#8896A8',
          300: '#A8B6C4',
          200: '#C8D4DE',
          100: '#E2EAF0',
        },
        volt: {
          500: '#C8F135',
          400: '#D4F55A',
          300: '#E0F87E',
        },
        ember: {
          500: '#FF6B35',
          400: '#FF8455',
        },
        sapphire: {
          500: '#3B82F6',
          400: '#60A5FA',
        },
      },
      backgroundImage: {
        'grid-ink': `linear-gradient(rgba(200,241,53,0.03) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(200,241,53,0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '48px 48px',
      },
      boxShadow: {
        'volt': '0 0 0 1px rgba(200,241,53,0.3), 0 0 30px rgba(200,241,53,0.1)',
        'card': '0 1px 0 rgba(255,255,255,0.04) inset, 0 -1px 0 rgba(0,0,0,0.3) inset',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        blink: {
          '0%,100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
