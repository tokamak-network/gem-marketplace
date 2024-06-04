import { Flex } from "@chakra-ui/react";
import Sidebar from "./sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex minH={"100vh"} bg={"#0D0E16"}>
      <Sidebar />
      {children}
    </Flex>
  );
};

export default Layout;
