/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing:{
        '34':'34px',
      },
      screens: {
        'sm': '430px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1100px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1210px',


        '2xl': '1560px',
        // => @media (min-width: 1536px) { ... }
      },
      gridTemplateColumns: {
        '15':'repeat(15, minmax(0,1fr))'
      }
    },
  },
  plugins: [],
};
