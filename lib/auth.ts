import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import prisma from "./prisma";

const validateRequest = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { cookies } = req;
    const token = cookies["spotify-clone-token"];

    let user;
    if (token) {
      try {
        const { id } = jwt.verify(token, "hello");
        user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw Error("not real  user");
        }
      } catch (error) {
        return res.status(401).json({ msg: "error" });
      }
      return handler(req, res, user);
    }
    return res.status(401).json({ msg: "error" });
  };
};
export const validateToken = (token) => {
  const user = jwt.verify(token, "hello");
  return user;
};
export default validateRequest;
