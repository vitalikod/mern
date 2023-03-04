import express from "express";
import { register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/getme", checkAuth, getMe);

export default router;
