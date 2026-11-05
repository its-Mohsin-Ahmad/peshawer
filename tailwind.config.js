/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#064E3B',
          dark: '#022C22',
          light: '#047857',
        },
        deepGreen: '#022C22',
        emeraldCustom: '#047857',
        gold: {
          light: '#E6C678',
          DEFAULT: '#D6A84F',
          dark: '#B88628',
        },
        cream: '#F8F6EA',
        mainText: '#102A24',
        secondaryText: '#64748B',
        lightGreen: '#ECFDF5',
        customBorder: '#E5E7EB',
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

