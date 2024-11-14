/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'black-ops': ['"Black Ops One"', 'system-ui'],
      },
      colors: {
        primary: '#2c003e',
        secondary: '#4b0082',
        accent: '#7a3595',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'color-pulse': 'colorPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        colorPulse: {
          '0%, 100%': { color: '#7a3595' },
          '50%': { color: '#4b0082' },
        }
      }
    },
  },
  plugins: [],
}