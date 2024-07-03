import RarityList from "@/components/common/RarityList";
import ColorList from "@/components/common/ColorList";
import { useSearchParams } from "next/navigation";

const Header = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("asset");

  return (
    !search &&
    <>
      <RarityList />
      <ColorList />
    </>
  );
};

export default Header;
