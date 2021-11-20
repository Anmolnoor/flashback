import { Response } from "express";
import logging from "../config/logging";

export const errorHandler = (res: Response, NAMESPACE: string, MSG: string, error: any) => {
	// Log error
	logging.error(NAMESPACE, MSG, error);

	// Respond with 500 error
	res.status(500).send({
		error: "Something failed!"
	});
};
