import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./sidebar";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex minH={"100vh"} bg={"#0D0E16"}>
      <Sidebar />
      <Box w={"100%"} p={"30px"}>
        <Header/>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
