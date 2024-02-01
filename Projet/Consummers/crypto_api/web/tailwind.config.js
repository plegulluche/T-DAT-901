
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  
  content: ['./src/pages/*', './src/component/**/*'],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width'
      },
      fontFamily:{
        custom1: ["Custom-1", "cursive"],
        
      },
        
      display: ["group-hover"],
    },
  },
  plugins: [],
}