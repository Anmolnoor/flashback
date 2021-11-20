import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";

const NAMESPACE = "Sample Controller";

export const sampleHealthCheck = (req: Request, res: Response) => {
	logging.info(NAMESPACE, "sample Health Check route called");
	res.status(200).json({
		message: "pong"
	});
};
