import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = "secretkey";

declare module "express" {
	export interface Request {
		userId?: any;
	}
}

const Auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// Get auth header value
		const bearerHeader = req.headers["authorization"];
		// Check if bearer is undefined
		if (typeof bearerHeader !== "undefined") {
			// Split at the space
			const bearer = bearerHeader.split(" ");
			// Get token from array
			const bearerToken = bearer[1];
			const isCustomAuth = bearerToken.length < 500;

			let decodedData: any;

			if (bearerToken && isCustomAuth) {
				decodedData = jwt.verify(bearerToken, secret);

				req.userId = decodedData.id;
			} else {
				decodedData = jwt.decode(bearerToken);

				req.userId = decodedData?.sub;
			}

			next();
		}
	} catch (error) {
		console.log(error);
	}
};

export default { Auth };
