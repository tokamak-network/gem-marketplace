import dynamic from "next/dynamic";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
// import Layout from "@/components/layout";
import { theme } from "@/styles/chakraTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { CacheProvider } from "@chakra-ui/next-js";
import { WagmiProvider } from "wagmi";
import { config } from "@/config/wagmi";
const Layout = dynamic(() => import("../components/layout"), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <CacheProvider>
        <ChakraProvider resetCSS theme={theme}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </QueryClientProvider>
          </WagmiProvider>
        </ChakraProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}
