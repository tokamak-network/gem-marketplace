import { useRecoilState } from "recoil";
import { activityContainerStatus } from "@/recoil/activity/atom";
import { useEffect } from "react";

const ActivityPage = () => {
  const [isOpen, setOpen] = useRecoilState(activityContainerStatus);

  useEffect(() => {
    setOpen(true);
  },[])
  return (
    <></>
  )
}

export default ActivityPage;