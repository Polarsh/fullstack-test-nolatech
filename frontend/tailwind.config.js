/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#32CD32', // Lime Green
        'my-red': '#FF6347 ',
        'my-blue': '#87CEEB  ',
        'bg-dark': '#1A1A1A ',
        'bg-light': '#F5F5F5 ',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
