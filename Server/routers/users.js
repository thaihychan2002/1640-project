import express from "express";
import { getUsers, loginUsers, registerUsers } from "../controller/users.js";
const router = express.Router();

router.get("/", getUsers);
router.post("/login", loginUsers);
router.post("/register", registerUsers);

export default router;
