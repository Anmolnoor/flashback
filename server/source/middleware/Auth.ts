import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import logging from "../config/logging";

const secret = "secretkey";

interface queryInterface {
	searchQuery: string;
	tags: string;
	page: string;
}
declare module "express" {
	export interface Request {
		userId?: any;
		token?: string;
		query: queryInterface;
	}
}

const Auth = async (req: Request, res: Response, next: NextFunction) => {
	logging.info("Auth Middleware", "Auth Middleware called");
	try {
		// Get auth header value
		const bearerHeader = req.headers["authorization"];
		// Check if bearer is undefined
		if (typeof bearerHeader !== "undefined") {
			// Split at the space
			const bearer = bearerHeader.split(" ");
			// Get token from array
			const bearerToken = bearer[1];
			// Set the token
			req.token = bearerToken;
			// Verify token
			const decoded = jwt.verify(req.token, secret);
			// Set userId to request
			req.userId = (decoded as JwtPayload).id;

			logging.info("Auth Middleware", "User get Authroized");
			next();
		} else {
			// Forbidden
			logging.info("Auth Middleware", "User not get Authroized");
			res.status(403).json({ message: "Forbidden" });
		}
	} catch (error) {
		logging.error("Auth Middleware", "Error in Auth Middleware", error);
		res.status(403).json({ message: "Forbidden" });
	}
};
export default { Auth };
