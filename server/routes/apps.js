import express from "express";
import auth from "../middlewares/auth.js";
import {
  getApps,
  createApp,
  deleteApp,
  getAppsWithBugs,
} from "../controllers/apps.js";

const router = express.Router();

router.get("/", auth, getApps);
router.get("/bugs", auth, getAppsWithBugs);
router.post("/", auth, createApp);
router.delete("/:appId", auth, deleteApp);

export default router;
