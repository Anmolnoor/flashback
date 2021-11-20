import { Router, Request, Response } from "express";
import { sampleHealthCheck } from "../controllers/sample";

const router = Router();

router.get("/ping", (req: Request, res: Response) => {
	res.json({ message: "pong" });
});

export default router;
