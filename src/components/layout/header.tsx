import { useSearchParams, usePathname } from "next/navigation";
import RarityList from "@/components/common/RarityList";
import ColorList from "@/components/common/ColorList";

const Header = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("asset");
  const pathname = usePathname();
  const pathName = pathname.substring(1, pathname.length);
  console.log(pathName);

  return search || pathName === "community" || pathName === "market/gemPack" ? (
    <></>
  ) : (
    <>
      <RarityList />
      <ColorList />
    </>
  );
};

export default Header;
