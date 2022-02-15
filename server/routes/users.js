import express from "express";
import auth from "../middlewares/auth.js";
import {
  getUser,
  createUser,
  editUser,
  deleteUser,
  changePassword,
} from "../controllers/users.js";

const router = express.Router();

router.post("/", createUser);
router.get("/me", auth, getUser);
router.patch("/me", auth, editUser);
router.patch("/me/password", auth, changePassword);
router.delete("/me", auth, deleteUser);

export default router;
