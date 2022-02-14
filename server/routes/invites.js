import express from "express";
import auth from "../middlewares/auth.js";
import { sendInvite, getInvite, acceptInvite } from "../controllers/invites.js";

const router = express.Router();

router.post("/", auth, sendInvite);
router.get("/:link", getInvite);
router.post("/:link", auth, acceptInvite);

export default router;
