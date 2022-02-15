import express from "express";
import auth from "../middlewares/auth.js";
import { getUser, createUser, changeUserName } from "../controllers/users.js";

const router = express.Router();

router.post("/", createUser);
router.get("/me", auth, getUser);
router.patch("/me", auth, changeUserName);

export default router;
