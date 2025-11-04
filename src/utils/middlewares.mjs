import { mockUsers } from "./constants.mjs";

export const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId))
    return res.status(400).json({ message: "Invalid user ID" });

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1)
    return res.status(404).json({ message: "User not found" });
  req.findUserIndex = findUserIndex;
  next();
};