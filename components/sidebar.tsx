import { Box, List, ListItem, ListIcon, Divider, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistPlay, MdFavorite } from "react-icons/md";
import NextImage from "next/image";
import NextLink from "next/link";

const navMenu = [
  { name: "home", icon: MdHome, route: "/" },
  { name: "search", icon: MdSearch, route: "/search" },
  { name: "library", icon: MdLibraryMusic, route: "/library" },
];
const musicMenu = [
  { name: "Create Playlist", icon: MdPlaylistPlay, route: "/" },
  { name: "Favourites", icon: MdFavorite, route: "/favourite" },
];

const playList = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

const Sidebar = () => {
  return (
    <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px" color="gray">
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.svg" height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((item) => (
              <ListItem paddingX="20px" fontSize="16px" key={item.name}>
                <LinkBox>
                  <NextLink href={item.route} passHref>
                    <LinkOverlay>
                      <ListIcon as={item.icon} color="white" marginRight="20px" />
                      {item.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        <Box marginBottom="20px">
          <List spacing={2} marginTop="20px">
            {musicMenu.map((music) => (
              <ListItem paddingX="20px" fontSize="16px" key={music.name}>
                <LinkBox>
                  <NextLink href={music.route} passHref>
                    <LinkOverlay>
                      <ListIcon as={music.icon} color="white" marginRight="20px" />
                      {music.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        <Box height="66%" overflowY="auto" paddingY="20px">
          <List spacing={2}>
            {playList.map((item) => (
              <ListItem paddingX="20px" key={item}>
                <LinkBox>
                  <NextLink href="/">
                    <LinkOverlay>{item}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
