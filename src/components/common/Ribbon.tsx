import { Box, Text, useTheme } from "@chakra-ui/react";

const Ribbon = ({ position = 'top-left', color = 'red' }) => {
  const theme = useTheme();

  return (
    <Box
      w={"90px"}
      h={"22px"}
      position="absolute"
      top={position.includes('top') ? '15px' : 'auto'}
      bottom={position.includes('bottom') ? '10px' : 'auto'}
      left={position.includes('left') ? '-20px' : 'auto'}
      right={position.includes('right') ? '-10px' : 'auto'}
      transform={
        position === 'top-left'
          ? 'rotate(-45deg)'
          : position === 'top-right'
          ? 'rotate(45deg)'
          : position === 'bottom-left'
          ? 'rotate(45deg)'
          : 'rotate(-45deg)'
      }
      backgroundColor={color}
      fontWeight="bold"
      fontSize="sm"
      zIndex="1"
      borderRadius="md"
      textAlign={"center"}
      style={{
        clipPath: 'polygon(23% 0, 77% 0, 100% 100%, 0 100%)',
      }}
    >
      <Text fontFamily={theme.fonts.Quicksand} fontSize={16} fontWeight={700}>Sale!</Text>
    </Box>
  );
};

export default Ribbon;