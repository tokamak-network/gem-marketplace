import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/layout";
import { theme } from "@/styles/chakraTheme";
import { RecoilRoot } from "recoil";
import { CacheProvider } from "@chakra-ui/next-js";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CacheProvider>
        <ChakraProvider resetCSS theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}
