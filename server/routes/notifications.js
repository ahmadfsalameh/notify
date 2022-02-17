import express from "express";
import auth from "../middlewares/auth.js";
import { getNotifications, markRead } from "../controllers/notifications.js";

const router = express.Router();

router.get("/", auth, getNotifications);
router.get("/read", auth, markRead);

export default router;
