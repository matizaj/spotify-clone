import validateRequest from "../../lib/auth";

export default validateRequest((req, res, user) => {
  res.json(user);
});
