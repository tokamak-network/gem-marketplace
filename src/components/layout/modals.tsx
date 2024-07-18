import ForgeConfirmModal from "../modal/ForgeConfirmModal";
import MiningModal from "../modal/MiningModal";
import ForgeSuccessModal from "../modal/ForgingSuccessModal";
import ObtainSuccessModal from "../modal/ObtainSuccessModal";
import CollectMinedGemModal from "../modal/CollectMinedGemModal";

const Modals = () => {
  return (
    <>
      <MiningModal />
      <ForgeConfirmModal />
      <ForgeSuccessModal />
      <ObtainSuccessModal />
      <CollectMinedGemModal />
    </>
  );
};

export default Modals;
