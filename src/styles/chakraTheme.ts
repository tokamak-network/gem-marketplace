import { extendTheme } from "@chakra-ui/theme-utils";
import "@fontsource/poppins";
import "@fontsource/Inter";
import "@fontsource/open-sans";

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
    }),
  },
});

export { theme };
