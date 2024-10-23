import { Box, keyframes } from "@chakra-ui/react";

const gradientAnimation = keyframes`
  0% { background-position: -200% 0%; }
  100% { background-position: 200% 0%; }
`;

export default function GradientSpinner() {
  return (
    <Box
      w="100%"
      h="100%"
      bgGradient="linear(to-r, #2b2f42 8%, #2b2f42 38%, #1c1d25 54%)"
      bgSize="200% 100%"
      borderRadius={"8px"}
      animation={`${gradientAnimation} 10s linear infinite`}
    />
  );
}
