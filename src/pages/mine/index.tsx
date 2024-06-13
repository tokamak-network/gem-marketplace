import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import MiningIntroModal from "@/components/modal/MiningIntroModal";

const MinePage = () => {
  const [storedValue,] = useLocalStorage("mineIntro", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);

  const handleGuideModal = () => {
    setGuideModal(false);
  }
  return (
    <Box>
      <MiningIntroModal isOpen={isGuideModal} onClose={handleGuideModal}/>
    </Box>
  )
}

export default MinePage;