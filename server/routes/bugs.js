import express from "express";
import auth from "../middlewares/auth.js";
import {
  getBugs,
  getTasks,
  createBug,
  assignBugToUser,
  changeBugStatusAndIndex,
} from "../controllers/bugs.js";

const router = express.Router();

router.get("/", auth, getBugs);
router.get("/me", auth, getTasks);
router.post("/", createBug);
router.patch("/assign/:bugId", auth, assignBugToUser);
router.patch("/:bugId", auth, changeBugStatusAndIndex);

export default router;
