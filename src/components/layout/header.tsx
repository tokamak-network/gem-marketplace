import { useSearchParams, usePathname } from "next/navigation";
import RarityList from "@/components/common/RarityList";
import ColorList from "@/components/common/ColorList";

const Header = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("asset");
  const pathname = usePathname();
  const pathName = pathname.substring(1, pathname.length);

  return search || pathName === "community" || pathName === "market/gempack" ? (
    <></>
  ) : (
    <>
      <RarityList />
      <ColorList />
    </>
  );
};

export default Header;
