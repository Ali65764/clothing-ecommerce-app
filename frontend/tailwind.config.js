/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 500 is the primary navy, 200 is the light-blue accent.
        brand: {
          50: '#F1F5FE',
          100: '#DEE9FC',
          200: '#93C5FD',
          300: '#6BA3F0',
          400: '#3D6BC4',
          500: '#1E3A8A',
          600: '#183071',
          700: '#122558',
        },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '6px',
      },
    },
  },
  plugins: [],
}
