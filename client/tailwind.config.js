/** @type {import('tailwindcss').Config} */
const plugin = require('tailwind-scrollbar');

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js", // Include library here
  ],
  theme: {
    extend: {
      fontFamily:{
        "poppins":["Poppins","serif"],
        "comic":["Comic Relief","system-ui"]
      },
      fontSize:{
         "label_size":"14px",
          "input_text":"13px",
      },
      height:{
       "input_height":"39px",
       "btn_height":"38px"
      },
      padding:{
         "input_padding":"12px"
      },
      fontWeight:{
          "label_weight":"400",
          "btn_font_weight":"500"
      },
      colors:{
        "brand_color":"#F68A1F",
            customGray: '#e2e8f0', // Example color
        customBlue: '#3b82f6',
        table_header:"rgba(241 241 241)",
        table_title:"rgba(102 102 102)",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite', // Adjust the duration
        'spin-reverse': 'spin 1s linear infinite reverse',
      },
    },
  },
  plugins: [
    plugin({ nocompatible: true }),
  ],
}