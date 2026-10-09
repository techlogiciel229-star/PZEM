/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        navy: '#071934',
        gold: '#D3A940',
        canvas: '#F3F4F5',
        line: '#E6E8EB',
        secondary: '#44474D'
      }
    }
  },
  plugins: [],
}
