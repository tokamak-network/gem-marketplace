import { Flex } from "@chakra-ui/react";
import Sidebar from "./sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex>
      <Sidebar />
      {children}
    </Flex>
  );
};

export default Layout;
