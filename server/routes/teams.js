import express from "express";
import auth from "../middlewares/auth.js";
import { getTeam, createTeam, deleteTeam } from "../controllers/teams.js";

const router = express.Router();

router.get("/", auth, getTeam);
router.post("/", auth, createTeam);
router.delete("/:id", auth, deleteTeam);

export default router;
