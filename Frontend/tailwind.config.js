/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['Lobster', 'cursive'],
        robotoCondensed: ['"Roboto Condensed"', 'sans-serif'],
      },
      colors:{
        "footer-font" : "e6e6e6",
      },
      ypography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800"),
            a: {
              color: theme("colors.indigo.500"),
              "&:hover": {
                color: theme("colors.indigo.700"),
              },
              textDecoration: "underline",
            },
            strong: { fontWeight: "700" },
            h1: { fontSize: theme("fontSize.5xl") },
            h2: { fontSize: theme("fontSize.4xl") },
            code: {
              backgroundColor: theme("colors.gray.100"),
              padding: "0.2em 0.4em",
              borderRadius: theme("borderRadius.sm"),
              color: theme("colors.pink.600"),
            },
          },
        },
        lg: {
          css: {
            h1: {
              fontSize: theme("fontSize.5xl"),
            },
          },
        },
      })
    }
  },
  plugins: [require("@tailwindcss/typography")],
}

