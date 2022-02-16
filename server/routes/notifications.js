import express from "express";
import auth from "../middlewares/auth.js";
import { getNotifications } from "../controllers/notifications.js";

const router = express.Router();

router.get("/", auth, getNotifications);

export default router;
