import express from "express";

import { signinController, signupController } from "../controllers/Auth";

const router = express.Router();
router.post("/signin", signinController);
router.post("/signup", signupController);

export default router;
