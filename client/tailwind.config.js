/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage:{
        'Edward': "url('../public/img/kiss.jpg')"
      },
      keyframes:{
        appearDisappear: {
          '0%': {color:'white'},
          '75%':{color:'grey'},
          '100%': {color:'transparent'},
        },
        expandOut1: {
          '0%':{
            transform:'translateX(-50%)',
            color:'transparent',
          },
          '100%':{
            transform:'translateX(-50%)  translateY(-150%)',
            color:'black',
          }
        },
        expandOut2: {
          '0%':{
            transform:'translateX(-50%)',
            color:'transparent',
          },
          '100%':{
            transform:'translateX(-50%) translateY(-300%)',
            color:'black',
          },
        },
        expandOut3:{
          '0%':{
            transform:'translateX(-50%)',
            color:'transparent',
          },
          '100%':{
            transform:'translateX(-50%) translateY(-450%)',
            color:'black',
          },
        }
      },
      animation:{
        'fade': 'appearDisappear 1.5s linear forwards',
        'expandOut1':'expandOut1 1s ease-in forwards',
        'expandOut2':'expandOut2 1s ease-in forwards',
        'expandOut3':'expandOut3 1s ease-in forwards',
      }
    },
  },
  plugins: [],
}
