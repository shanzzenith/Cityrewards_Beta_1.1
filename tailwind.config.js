/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#1A5F4F',
        'primary-light': '#2D7A67',
        'primary-pale': '#E8F3F0',
        cream: '#F5F4EF',
        'cream-dark': '#ECEAE3',
        leaf: '#3D8B7A',
        'text-dark': '#1A1A1A',
        'text-mid': '#4A4A4A',
        'text-soft': '#888880',
      },
      fontFamily: {
        sans: ['System', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
