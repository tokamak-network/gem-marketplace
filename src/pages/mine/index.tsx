import { useLocalStorage } from "@/hooks/useLocalStorage";
import MiningIntroModal from "@/components/modal/MiningIntroModal";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

const MinePage = () => {
  const [storedValue, setValue] = useLocalStorage("mineIntro", true);
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