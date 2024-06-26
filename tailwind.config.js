/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // fontFamily: {
    //   sans: ['Graphik', 'sans-serif'],
    //   serif: ['Merriweather', 'serif'],
    // },
    extend: {
      colors: {
        'gray-color': '#868686' /*onboarding 작은 글씨 색상*/,
        'main-color': '#232322',
        'join-color': '#B7B7B7' /*join Input 색상*/,
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
