import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./sidebar";
import Header from "./header";
import Modals from "./modals";
import Drawers from "../drawer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex minH={"100vh"} bg={"#0D0E16"}>
      <Sidebar />
      <Box w={"100%"} p={"40px"}>
        <Header />
        {children}
      </Box>
      <Modals />
      <Drawers />
    </Flex>
  );
};

export default Layout;
