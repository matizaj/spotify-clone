import { GetServerSideProps } from "next";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const Playlist = ({ playlist }) => {
  return <div>{playlist.name}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  console.log("context", query.id as String);
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
