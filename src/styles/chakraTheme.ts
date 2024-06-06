import { extendTheme } from "@chakra-ui/theme-utils";
import "@fontsource/poppins";
import "@fontsource/inter";
import "@fontsource/open-sans";
import "@fontsource/poppins/600.css"

const fonts = {
  Poppins: "Poppins",
  Inter: "Inter",
  openSans: "Open Sans, sans-serif",
};

const theme = extendTheme({
  fonts: {
    body: fonts.Poppins,
    Inter: fonts.Inter,
    OpenSans: fonts.openSans
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
        boxSizing: "border-box",
        color: "white"
      }
    }),
  },
});

export { theme };
