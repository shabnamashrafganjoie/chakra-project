import { extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
    styles:{
        direction: 'rtl'
    },
    colors: {
        transparent: 'transparent',
        primary: {
            100: '#171D38',
            backgroundHover: '#163963',
        },
        brand: {
            50: "#e6f6f1",
            100: "#c1ede0",
            200: "#96e3c9",
            300: "#6cd9b2",
            400: "#42cf9b",
            500: "#27b887", // اصلی StockX green
            600: "#1d9169",
            700: "#136a4b",
            800: "#0a4330",
            900: "#002b1c",
          },
          gray: {
            50: "#f7f7f7",
            100: "#eeeeee",
            200: "#e0e0e0",
            300: "#c6c6c6",
            400: "#9e9e9e",
            500: "#7d7d7d",
            600: "#5e5e5e",
            700: "#3c3c3c",
            800: "#2a2a2a",
            900: "#1a1a1a",
          },
    },
    fontSizes:{
        heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
    },
    letterSpacings:{},
    breakpoints:{
        base: "0px",  
        md: "768px",
        
    }
  })
export default theme