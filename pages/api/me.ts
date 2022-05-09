import validateRequest from "../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRequest(async (req, res, user) => {
  const playlistCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  });

  res.json({ ...user, playlistCount });
});
