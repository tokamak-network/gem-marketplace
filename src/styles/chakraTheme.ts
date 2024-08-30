import { extendTheme } from "@chakra-ui/theme-utils";
import "@fontsource/poppins";
import "@fontsource/inter";
import "@fontsource/open-sans";
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/300.css"
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/quicksand";
import "@fontsource/quicksand/700.css";
import "@fontsource/zcool-xiaowei";

const fonts = {
  Poppins: "Poppins",
  Inter: "Inter",
  openSans: "Open Sans, sans-serif",
  quicksand: "Quicksand",
  zcool: "ZCOOL XiaoWei"
};

const theme = extendTheme({
  fonts: {
    body: fonts.Poppins,
    Inter: fonts.Inter,
    OpenSans: fonts.openSans,
    Quicksand: fonts.quicksand,
    Zcool: fonts.zcool
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
