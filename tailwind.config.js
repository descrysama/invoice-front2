/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },

        'slideIn': {
          'from': {
              left: '-500px'
              
          },
          'to': {
              left: '0px',
          },
      },
      },
      animation: {
        'waving-hand': 'wave 0.5s linear',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      
    },
  },
  plugins: [],
}
