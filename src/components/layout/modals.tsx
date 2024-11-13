import ForgeConfirmModal from "../modal/ForgeConfirmModal";
import MiningModal from "../modal/MiningModal";
import ForgeSuccessModal from "../modal/ForgingSuccessModal";
import ObtainSuccessModal from "../modal/ObtainSuccessModal";
import CollectMinedGemModal from "../modal/CollectMinedGemModal";
import SellGemModal from "../modal/SellGemModal";
import BurnGemModal from "../modal/BurnModal";
import SellSuccessModal from "../modal/SellSuccessModal";

const Modals = () => {
  return (
    <>
      <MiningModal />
      <ForgeConfirmModal />
      <ForgeSuccessModal />
      <ObtainSuccessModal />
      <CollectMinedGemModal />
      <SellGemModal />
      <BurnGemModal />
      <SellSuccessModal />
    </>
  );
};

export default Modals;
