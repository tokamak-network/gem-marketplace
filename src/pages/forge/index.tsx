import ForgingIntroModal from "@/components/modal/ForgingIntroModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

const ForgePage = () => {
  const [storedValue] = useLocalStorage("forgeIntro", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);

  return (
    <Box>
      <ForgingIntroModal
        isOpen={isGuideModal}
        onClose={() => setGuideModal(false)}
      />
    </Box>
  );
};

export default ForgePage;
