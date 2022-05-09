import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import GradientLayout from "../../components/gradientLayout";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
const getBgColor = (id) => {
  const colors = ["red", "green", "blue", "teal", "gray", "yellow", "purple", "pink"];
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
  const color = getBgColor(playlist.id);
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <div>sddfgghdfhf</div>
    </GradientLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies["spotify-clone-token"]);
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};

export default Playlist;
