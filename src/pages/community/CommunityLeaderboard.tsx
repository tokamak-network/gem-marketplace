import { Box, Flex } from "@chakra-ui/react";
import FilterItem from "@/components/common/FilterItem";
import { LeaderboardStatus } from "@/recoil/community/atom";
import { useRecoilState } from "recoil";

const TypeFilterBar = () => {
  const [filterStatus, setFileterStatus] = useRecoilState(LeaderboardStatus);
  const filterMenuList = ["overall", "mine", "forge", "value", "myself"];

  const handleFilter = (filter: string) => {
    if (filterStatus["overall"] === true) {
      if (filter === "overall") return;

      setFileterStatus((prev) => ({
        ...prev,
        ...{ ["overall"]: false, [filter]: !prev[filter] },
      }));
    } else {
      const checkedFilterMenuList = filterMenuList.filter(
        (item) => item !== "overall" && item !== filter
      );
      let isBeforeOverall = true;
      let isBeforeNone = true;

      for (let item of checkedFilterMenuList) {
        if (filterStatus[item] === false) {
          isBeforeOverall = false;
          break;
        }
      }

      for (let item of checkedFilterMenuList) {
        if (filterStatus[item] === true) {
          isBeforeNone = false;
          break;
        }
      }

      if (isBeforeNone || isBeforeOverall || filter === "overall") {
        setFileterStatus({
          overall: true,
          mine: true,
          forge: true,
          value: true,
          myself: true,
        });
      }
      else {
        setFileterStatus((prev) => ({
          ...prev,
          ...{ [filter]: !prev[filter] },
        }));
      }

    }
  };

  return (
    <Flex columnGap={4}>
      {filterMenuList.map((item, key) => (
        <FilterItem
          key={key}
          active={filterStatus[item]}
          handleFilter={() => handleFilter(item)}
        >
          {item === "myself" ? "Find Me" : item}
        </FilterItem>
      ))}
    </Flex>
  );
};

const CommunityLeaderboard = () => {
  return (
    <Box
      w={"100%"}
      rounded={16}
      bgColor={"#FFFFFF08"}
      p={"20px 20px 10px 10px"}
    >
      <Flex justify={"space-between"}>
        <TypeFilterBar />
      </Flex>
    </Box>
  );
};

export default CommunityLeaderboard;
