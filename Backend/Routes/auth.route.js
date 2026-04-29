import express from "express";
import { SignIn,SignUp,VerifyEmail } from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", SignIn);
router.post("/signup", SignUp);
router.post("/verify-email", VerifyEmail);

export default router;