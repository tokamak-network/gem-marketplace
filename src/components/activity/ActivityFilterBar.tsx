import { activityFilterList } from "@/recoil/activity/atom";
import { Center, Flex, useTheme } from "@chakra-ui/react";
import { activityFilterStatus } from "@/recoil/activity/atom";
import { useRecoilState } from "recoil";

const ActivityFilterItem = ({
  isActive,
  title,
  onClick
}: {
  isActive?: boolean;
  title: string;
  onClick: () => void;
}) => {
  const theme = useTheme();

  return (
    <Center
      minW={62}
      h={30}
      p={3}
      border={"1px solid"}
      borderColor={isActive ? "#FFFFFF" : "transparent"}
      textTransform={"capitalize"}
      opacity={isActive ? 1 : 0.5}
      rounded={"full"}
      bgColor={"#2A2C3A"}
      fontFamily={theme.fonts.Inter}
      fontSize={12}
      fontWeight={400}
      cursor={"pointer"}
      onClick={() => onClick()}
    >
      {title}
    </Center>
  );
};

const ActivityFilterBar = () => {
  const [activityStatus, setActivityStatus] = useRecoilState(activityFilterStatus);

  return (
    <Flex w={"100%"} justify={"space-between"} mt={"30px"}>
      {activityFilterList.map((item, key) => (
        <ActivityFilterItem
          key={key}
          isActive={item === activityStatus}
          title={item}
          onClick={(() => setActivityStatus(item))}
        />
      ))}
    </Flex>
  );
};

export default ActivityFilterBar;
