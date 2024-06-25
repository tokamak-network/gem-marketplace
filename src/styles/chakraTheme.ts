import { extendTheme } from "@chakra-ui/theme-utils";
import "@fontsource/poppins";
import "@fontsource/inter";
import "@fontsource/open-sans";
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/400.css"
import "@fontsource/inter/400.css";
import "@fontsource/quicksand";
import { Quicksand } from "next/font/google";

const fonts = {
  Poppins: "Poppins",
  Inter: "Inter",
  openSans: "Open Sans, sans-serif",
  quicksand: "Quicksand"
};

const theme = extendTheme({
  fonts: {
    body: fonts.Poppins,
    Inter: fonts.Inter,
    OpenSans: fonts.openSans,
    Quicksand: fonts.quicksand
    
  },

  breakpoints: {
    base: "0px",
    sm: "360px",
    md: "799px",
    lg: "1200px",
  },

  styles: {
    global: () => ({
      'body': {
        color: "white"
      }
    }),
  },
});

export { theme };
