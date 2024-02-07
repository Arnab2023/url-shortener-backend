import express from "express";
import { RegistrationHandeler, LoginHandeler } from "../controllers/user.js";

const router = express.Router();

router.post("/login", LoginHandeler);
router.post("/register", RegistrationHandeler);

export default router;
