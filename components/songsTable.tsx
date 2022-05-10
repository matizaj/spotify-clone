import { Box, Table, Thead, Td, Tr, Tbody, Th, IconButton } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { formatDate, formatTime } from "../lib/formattres";

const SongTable = ({ songs }) => {
  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <IconButton icon={<BsFillPlayFill fontSize="30px" />} aria-label="play" colorScheme="green" size="lg" isRound />
      </Box>
      <Table variant="unstyled">
        <Thead borderBottom=" 1px solid" borderColor="rgba(255,255,255,0.2)">
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Date added</Th>
            <Th>
              <AiOutlineClockCircle />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {songs.map((song, i) => (
            <Tr sx={{ transition: "all .3s", "&:hover": { bg: "rgba(255,255,255, .1)" } }} key={song.id} cursor="pointer">
              <Td> {i + 1}</Td>
              <Td> {song.name}</Td>
              <Td> {formatDate(song.createdAt)}</Td>
              <Td> {formatTime(song.duration)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SongTable;
