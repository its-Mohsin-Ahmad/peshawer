/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emeraldTheme: {
          primary: '#003D25',
          deep: '#002D1C',
          secondary: '#004B2E',
          base: '#006B40',
          light: '#087B4B',
        },
        goldTheme: {
          DEFAULT: '#E6AA27',
          bright: '#FFC83D',
          light: '#DDB65A',
        },
        forest: {
          DEFAULT: '#006B40',
          dark: '#002D1C',
          light: '#087B4B',
        },
        deepGreen: '#002D1C',
        emeraldCustom: '#006B40',
        gold: {
          light: '#DDB65A',
          DEFAULT: '#E6AA27',
          bright: '#FFC83D',
          dark: '#B88628',
        },
        cream: '#003D25',
        mainText: '#FFFFFF',
        secondaryText: '#E8F3EC',
        lightGreen: '#004B2E',
        customBorder: 'rgba(230, 170, 39, 0.25)',
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(2, 44, 34, 0.08)',
        'premium-hover': '0 25px 50px -12px rgba(214, 168, 79, 0.15)',
        'gold-glow': '0 0 25px rgba(214, 168, 79, 0.35)',
      },
    },
  },
  plugins: [],
}

