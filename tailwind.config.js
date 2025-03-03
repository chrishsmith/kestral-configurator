/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kestral': {
          'primary': '#0297EB',
          'secondary': '#2547A1',
          'teal': '#1CC6D3',
          'gray-light': '#C6C6C6',
          'gray-dark': '#5E5E5E',
        },
      },
      fontFamily: {
        'sans': ['Source Sans Variable', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

