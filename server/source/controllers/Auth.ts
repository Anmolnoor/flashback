import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/Auth";
import { errorHandler } from "../Utils/Helper.";

const NAMESPACE = "Auth Controller";

const authController = (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, "Authorization route Called");
	return res.status(200).json({
		message: "Authorization"
	});
	// next();
};

export const signinController = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, "Sign in route Called");

	const { email, password } = req.body;
	logging.info(NAMESPACE, "Sing in Details", { email, password });
	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser) return res.status(404).json({ message: "User does not exist." });

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

		if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials." });

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "secretkey", { expiresIn: "1H" });

		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		errorHandler(res, NAMESPACE, "Something Went Wrong", error);
		res.status(500).json({ message: "Something went Wrong" });
	}
};

export const signupController = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, "Sign up route Called");
	const { email, password, confirmPassword, firstname, lastname } = req.body;
	logging.info(NAMESPACE, "Sing up Details", { email, password, confirmPassword, firstname, lastname });
	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) return res.status(400).json({ message: "User already exist!!!" });

		if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match!!!" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({ email, password: hashedPassword, name: `${firstname} ${lastname}` });
		console.log(result);
		const token = jwt.sign({ email: result.email, id: result._id }, "secretkey", { expiresIn: "1H" });

		res.status(200).json({ result, token });
	} catch (error) {
		errorHandler(res, NAMESPACE, "Something Went Wrong", error);
		res.status(500).json({ message: "Something went Wrong" });
	}
};

export default { authController, signinController, signupController };
