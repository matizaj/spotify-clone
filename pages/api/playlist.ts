import prisma from "../../lib/prisma";
import validateRequest from "../../lib/auth";

export default validateRequest(async (req, res, user) => {
  const playlist = await prisma.playlist.findMany({
    where: { userId: user.id },
    orderBy: {
      name: "asc",
    },
  });
  res.json(playlist);
});
