import Image from "next/image";
import Link from "next/link";
import { Flex, Text, useTheme, Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import Logo from "@/assets/icon/symbol.svg";
import Market from "@/assets/icon/market.svg";
import Saved from "@/assets/icon/saved.svg";
import Mine from "@/assets/icon/mine.svg";
import Forge from "@/assets/icon/forge.svg";
import Gemonomics from "@/assets/icon/gemonomics.svg";
import Chest from "@/assets/icon/chest.svg";
import Wallet from "@/assets/icon/wallet.svg";
import Activity from "@/assets/icon/activity.svg";
import Settings from "@/assets/icon/setting.svg";

interface MenuType {
  children: React.ReactNode;
  icon: string;
  link: string;
}

const Sidebar = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const pathName = pathname.substring(1,pathname.length);

  const CustomMenuItem = ({ children, icon, link }: MenuType) => {
    const isActive = pathName === link;
    return (
      <Link href={`/${link}`}>
        <Flex
          color={isActive ? "white" : "#FFFFFF80"}
          pl={isActive ? 8 : 9}
          my={4}
          borderLeft={isActive ? "4px solid #0075FF" : ""}
          columnGap={3}
        >
          <Image alt={link} src={icon} width={24} height={24} />
          <Text fontWeight={600}>{children}</Text>
        </Flex>
      </Link>
    );
  };

  const MenuTitle = ({ children }: { children: React.ReactNode }) => {
    return (
      <Text
        bgGradient={"linear(to-r, #0BFFF0, #0075FF)"}
        letterSpacing={"0.3em"}
        fontSize={12}
        fontWeight={600}
        bgClip={"text"}
        color={"transparent"}
        textTransform={"uppercase"}
        pl={9}
        my={4}
      >
        {children}
      </Text>
    );
  };

  return (
    <Flex
      flexDir={"column"}
      bg={"#0D0E16"}
      minW={"243px"}
      borderRight={"2px solid #1E2033"}
    >
      <Flex align={"center"} columnGap={"10px"} p={9}>
        <Image alt="logo" src={Logo} width={36} height={36} />
        <Text
          fontFamily={theme.fonts.OpenSans}
          fontSize={20}
          fontWeight={700}
          color={"white"}
        >
          Project Opal
        </Text>
      </Flex>

      <MenuTitle>Marketplace</MenuTitle>
      <CustomMenuItem icon={Market} link="market">
        Market
      </CustomMenuItem>
      <CustomMenuItem icon={Saved} link="saved">
        Saved
      </CustomMenuItem>

      <Box h={4} />

      <MenuTitle>Gems</MenuTitle>
      <CustomMenuItem icon={Mine} link="mine">
        Mine
      </CustomMenuItem>
      <CustomMenuItem icon={Forge} link="forge">
        Forge
      </CustomMenuItem>
      <CustomMenuItem icon={Gemonomics} link="gemonomics">
        Gemonomics
      </CustomMenuItem>

      <Box h={4} />

      <MenuTitle>Account</MenuTitle>
      <CustomMenuItem icon={Chest} link="chest">
        Chest
      </CustomMenuItem>
      <CustomMenuItem icon={Wallet} link="wallet">
        Wallet
      </CustomMenuItem>
      <CustomMenuItem icon={Activity} link="activity">
        Activity
      </CustomMenuItem>
      <CustomMenuItem icon={Settings} link="settings">
        Settings
      </CustomMenuItem>
    </Flex>
  );
};

export default Sidebar;
