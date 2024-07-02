import { GemList } from "@/constants";
import { GemStandard } from "@/types";
import GemCard from "@/components/common/GemCard";

interface ItemProps {
  id: number;
}

const GemItem = ({ id }: ItemProps) => {
  const gemItem = GemList.filter(
    (item: GemStandard) => item.id === id
  );

  return (
    <GemCard
      mode="normal"
      width={453}
      height={581}
      staked={128.2907}
      rarityScore={10}
      gemInfo={gemItem[0]}
      dailyChange={16.7}
    />
  );
};

export default GemItem;
