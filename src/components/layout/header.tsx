import { useSearchParams, usePathname } from "next/navigation";
import RarityList from "@/components/common/RarityList";
import ColorList from "@/components/common/ColorList";
import { Box, Flex } from "@chakra-ui/react";
import SortBar from "./SortBar";

const Header = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("asset");
  const pathname = usePathname();
  const pathName = pathname.substring(1, pathname.length);

  return search || pathName === "community" || pathName === "market/gempack" ? (
    <></>
  ) : (
    <Flex justify={"space-between"}>
      <Box>
        <ColorList />
        <RarityList />
      </Box>

      <SortBar/>
    </Flex>
  );
};

export default Header;
