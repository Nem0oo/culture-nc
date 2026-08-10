/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F8F8F6',
        primary: '#2F6B3C',
        secondary: '#B6502E',
        semis: '#F5C842',
        enterre: '#E8833A',
        recolte: '#3A9B5C',
        bouture: '#9B6BC4'
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      transitionDuration: {
        DEFAULT: '150ms'
      },
      borderRadius: {
        card: '12px'
      }
    }
  },
  plugins: []
}
