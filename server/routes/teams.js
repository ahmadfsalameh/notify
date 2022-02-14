import express from "express";
import auth from "../middlewares/auth.js";
import { getTeams, createTeam, deleteTeam } from "../controllers/teams.js";

const router = express.Router();

router.get("/", auth, getTeams);
<<<<<<< HEAD
router.get("/members/appId", auth, getMembers);
=======
>>>>>>> 6417656aff97e01c69c98ea5d1f8f9921703201e
router.post("/", auth, createTeam);
router.delete("/:id", auth, deleteTeam);

export default router;
