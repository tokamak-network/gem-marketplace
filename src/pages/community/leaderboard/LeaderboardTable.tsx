import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const LeaderboardTable = () => {
  return (
    <TableContainer w={"full"}>
      <Table variant="striped" colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th>Address</Th>
            <Th>Mine</Th>
            <Th>Forge</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>0xle12...3653</Td>
            <Td>19,262</Td>
            <Td>16,357</Td>
            <Td>$235,864</Td>
          </Tr>
          <Tr>
            <Td>0xle12...3653</Td>
            <Td>19,262</Td>
            <Td>16,357</Td>
            <Td>$235,864</Td>
          </Tr>
          <Tr>
            <Td>0xle12...3653</Td>
            <Td>19,262</Td>
            <Td>16,357</Td>
            <Td>$235,864</Td>
          </Tr>
          <Tr>
            <Td>0xle12...3653</Td>
            <Td>19,262</Td>
            <Td>16,357</Td>
            <Td>$235,864</Td>
          </Tr>
          <Tr>
            <Td>0xle12...3653</Td>
            <Td>19,262</Td>
            <Td>16,357</Td>
            <Td>$235,864</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default LeaderboardTable;
