import { Router } from "express";
import { checkSchema, matchedData, query, validationResult } from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";



const router = Router();

router.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 10 })
    .withMessage("Filter must be a string between 3 and 10 characters"),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const {
      query: { filter, value },
    } = req;
    if (filter && value)
      return res.send(
        mockUsers.filter(
          (user) =>
            user[filter] &&
            user[filter].toLowerCase().includes(value.toLowerCase())
        )
      );
    return res.send(mockUsers);
  }
);

router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return res.status(404).json({ message: "User not found" });
  res.json(findUser);
});

router.post(
  "/api/users",checkSchema(createUserValidationSchema),  (req, res) => {
    const { username, displayName } = req.body;
    const result = validationResult(req);
    console.log(result);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const data = matchedData(req);
    console.log("Matched Data:", data);
    const newUser = {
      id: mockUsers.length + 1,
      username,
      displayName,
    };
    mockUsers.push(newUser);
    res.status(201).json(newUser);
  }
);

router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  res.json(mockUsers[findUserIndex]);
  return;
});

router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  res.json(mockUsers[findUserIndex]);
  return;
});

router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  mockUsers.splice(findUserIndex, 1);
  res.status(204).send();
});

export default router;
