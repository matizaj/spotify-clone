import { Box } from "@chakra-ui/react";
import Sidebar from "./sidebar";

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" width="250px" left="0" border="2px">
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        Layout here with Vercel deploy! {children}
      </Box>
      <Box position="absolute" left="0" bottom="0" border="2px">
        player
      </Box>
    </Box>
  );
};

export default PlayerLayout;
