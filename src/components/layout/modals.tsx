import ForgeConfirmModal from "../modal/ForgeConfirmModal";
import MiningModal from "../modal/MiningModal";
import ForgeSuccessModal from "../modal/ForgingSuccessModal";
import ObtainSuccessModal from "../modal/ObtainSuccessModal";

const Modals = () => {
  return (
    <>
      <MiningModal />
      <ForgeConfirmModal />
      <ForgeSuccessModal />
      <ObtainSuccessModal />
    </>
  );
};

export default Modals;
