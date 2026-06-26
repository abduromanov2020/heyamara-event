/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0A0813', 900: '#100C1B', 850: '#16111F', 800: '#1C1630',
          750: '#231C3A', 700: '#2A2340', 600: '#3A3358', 500: '#6E6788',
          400: '#A39CC0', 300: '#C8C2DE', 200: '#F4F1FB',
        },
        brand: {
          50: '#FBF5FF', 100: '#F0ABFC', 200: '#EBB6FD', 300: '#C4A6FB',
          400: '#A855F7', 500: '#9333EA', 600: '#7C3AED', 700: '#6D28D9',
        },
        magenta: '#D946EF',
        'magenta-deep': '#C026D3',
        pink: '#EC4899',
        'pink-soft': '#F0ABFC',
        'violet-deep': '#7C3AED',
        indigo: '#8B5CF6',
        rose: '#FB7185',
        mint: '#6EE7B7',
        lilac: '#C4B5FD',
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.03em' },
      keyframes: {
        twinkle: { '0%,100%': { opacity: '.4' }, '50%': { opacity: '.9' } },
        'orb-drift': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(3%,-4%) scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        twinkle: 'twinkle 5s ease-in-out infinite',
        'orb-drift': 'orb-drift 16s ease-in-out infinite',
        shimmer: 'shimmer 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
