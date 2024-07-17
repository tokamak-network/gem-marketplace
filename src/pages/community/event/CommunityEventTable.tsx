import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const CommunityEventTable = () => {
  return (
    <TableContainer flexGrow={1} h={"full"} pos={"relative"} w={"full"} bgImage={"/assets/images/event.png"} rounded={16} bgSize={"cover"} bgRepeat={"no-repeat"} >
      <Box pos={"absolute"} w={"full"} h={"full"} left={0} top={0} zIndex={0} bgGradient={"radial(#000000B2,#000000D9)"}/>
      <Table pos={"relative"} variant="striped" colorScheme="whiteAlpha" zIndex={1}>
        <Thead>
          <Tr>
            <Th>Top Contributors</Th>
            <Th>Forges</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>0xle12...3653</Td>
            <Td>19,262</Td>
            <Td>$235,864</Td>
          </Tr>
          <Tr>
            <Td>0xle12...3653</Td>
            <Td>19,262</Td>
            <Td>$235,864</Td>
          </Tr>
          <Tr>
            <Td>0xle12...3653</Td>
            <Td>19,262</Td>
            <Td>$235,864</Td>
          </Tr>
          <Tr>
            <Td>0xle12...3653</Td>
            <Td>19,262</Td>
            <Td>$235,864</Td>
          </Tr>
          <Tr>
            <Td>0xle12...3653</Td>
            <Td>19,262</Td>
            <Td>$235,864</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default CommunityEventTable;