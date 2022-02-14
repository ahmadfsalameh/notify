import express from "express";
import auth from "../middlewares/auth.js";
import { getTeams, createTeam, deleteTeam } from "../controllers/teams.js";

const router = express.Router();

router.get("/", auth, getTeams);
router.post("/", auth, createTeam);
router.delete("/:id", auth, deleteTeam);

export default router;
