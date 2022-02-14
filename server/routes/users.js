import express from "express";
import auth from "../middlewares/auth.js";
import { getUser, createUser } from "../controllers/users.js";

const router = express.Router();

router.get("/me", auth, getUser);
router.post("/", createUser);

export default router;
