import Image from "next/image";
import Link from "next/link";
import {
  Flex,
  Text,
  useTheme,
  Box,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";

import Account from "../account/Account";

import { settingsContainerStatus } from "@/recoil/settings/atoms";

import Logo from "@/assets/icon/symbol.svg";
import GemstonLogo from "@/assets/icon/gemston_logo.svg";
import Market from "@/assets/icon/market.svg";
import Mine from "@/assets/icon/mine.svg";
import Forge from "@/assets/icon/forge.svg";
import Chest from "@/assets/icon/chest.svg";
import Github from "@/assets/icon/github.svg";
import Settings from "@/assets/icon/setting.svg";
import Community from "@/assets/icon/community.svg";
import Guide from "@/assets/icon/guide.svg";

interface MenuType {
  children: React.ReactNode;
  icon: string;
  link: string;
  newTab?: boolean;
}

const Sidebar = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const pathName = pathname.substring(1, pathname.length);
  const splitPathName = pathName.split("/");
  const [isSettings, setSettings] = useRecoilState(settingsContainerStatus);

  const CustomMenuItem = ({ children, icon, link, newTab }: MenuType) => {
    const isActive = pathName === link || link === splitPathName[0];
    return (
      <Link
        href={newTab ? link : `/${link}`}
        target={newTab ? "_blank" : ""}
        rel={newTab ? "noopener noreferrer" : ""}
      >
        <Flex
          pl={isActive ? 8 : 9}
          my={4}
          borderLeft={isActive ? "4px solid #0075FF" : ""}
          columnGap={3}
          opacity={isActive ? 1 : 0.5}
        >
          <Image alt={link} src={icon} width={24} height={24} />
          <Text fontWeight={600}>{children}</Text>
        </Flex>
      </Link>
    );
  };

  const SettingMenuItem = () => {
    return (
      <Flex
        pl={9}
        my={4}
        columnGap={3}
        opacity={isSettings ? 1 : 0.5}
        cursor={"pointer"}
        onClick={() => setSettings(true)}
      >
        <Image alt={"settings"} src={Settings} width={24} height={24} />
        <Text fontWeight={600}>Settings</Text>
      </Flex>
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
      <Flex align={"center"} flexDir={"column"} rowGap={"10px"} p={9}>
        <Image alt="logo" src={GemstonLogo} width={36} height={36} />
        <Text fontFamily={theme.fonts.Zcool} fontSize={38} color={"white"}>
          GemSTON
        </Text>
      </Flex>

      <MenuTitle>Account</MenuTitle>
      <Account />

      <Box h={6} />

      <MenuTitle>Gems</MenuTitle>
      <CustomMenuItem icon={Market} link="market">
        Market
      </CustomMenuItem>
      <CustomMenuItem icon={Mine} link="mine">
        Mine
      </CustomMenuItem>
      <CustomMenuItem icon={Forge} link="forge">
        Forge
      </CustomMenuItem>
      {/* <CustomMenuItem icon={Community} link="community">
        Community
      </CustomMenuItem> */}
      <CustomMenuItem icon={Chest} link="chest">
        Chest
      </CustomMenuItem>
      <Box h={4} />

      <MenuTitle>Account</MenuTitle>

      <CustomMenuItem
        icon={Guide}
        newTab
        link="https://www.notion.so/tokamak/GemSTON-A-Comprehensive-Overview-934b954a4c974a8cada97f3df2a87d38"
      >
        Help/Guide
      </CustomMenuItem>
      <CustomMenuItem
        icon={Github}
        newTab
        link="https://github.com/tokamak-network/gem-nft-contract"
      >
        Github
      </CustomMenuItem>
    </Flex>
  );
};

export default Sidebar;
