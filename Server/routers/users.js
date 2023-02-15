import express from "express";
import {
  getUsers,
  getUserById,
  loginUsers,
  loginGoogleUsers,
  registerUsers,
  registerGoogleUsers,
} from "../controller/users.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/getUserByID/:id", getUserById);
router.post("/login", loginUsers);
router.post("/google/login", loginGoogleUsers);
router.post("/register", registerUsers);
router.post("/google/register", registerGoogleUsers);
export default router;
