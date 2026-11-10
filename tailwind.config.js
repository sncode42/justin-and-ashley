/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#04100c',
          900: '#071a14',
          850: '#0a221a',
          800: '#0e2f24',
          700: '#144032',
          600: '#1c5543',
        },
        gold: {
          light: '#fbf3d5',
          shimmer: '#f4de9b',
          metallic: '#d4af37',
          warm: '#c59b27',
          antique: '#99761e',
          dark: '#684d0c',
        },
        ivory: {
          50: '#fdfbf7',
          100: '#faf8f5',
          200: '#f4efe7',
          300: '#ebe1d4',
          400: '#dfd2c0',
        },
        burgundy: {
          900: '#380e14',
          800: '#53161f',
          700: '#6f1f2b',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      },
      animation: {
        shimmer: 'shimmer 4s infinite linear',
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
