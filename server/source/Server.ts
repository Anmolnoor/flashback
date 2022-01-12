import express from "express";
import cors from "cors";
import Mongoose from "mongoose";
import config from "./config/config";
import logging from "./config/logging";
import sampleRoutes from "./routes/sample";
import userRoutes from "./routes/User";
import postRoutes from "./routes/Post";
import commentRoute from "./routes/Comment";
const NAMESPACE = "Server";
const router = express();

/** Logging the request */
router.use((req, res, next) => {
	logging.info(
		NAMESPACE,
		`METHOD - [${req.method}] URL - [${req.url}] IP - [${req.socket.remoteAddress}]`
	);
	res.on("finish", () => {
		logging.info(
			NAMESPACE,
			`METHOD - [${req.method}] URL - [${req.url}] IP - [${req.socket.remoteAddress}] STATUS - [${res.statusCode}]  STATUS MESSAGE - ${res.statusMessage}`
		);
	});
	next();
});

/** Parse the request */
router.use(express.json({ limit: "30mb" }));
router.use(
	express.urlencoded({ limit: "30mb", extended: true, parameterLimit: 50000 })
);
router.use(cors());

/** Rule of our API */
router.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Authroization, Content-Type, Accept"
	);

	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});

/** Routes */
router.use("/sample", sampleRoutes);
router.use("/user", userRoutes);
router.use("/posts", postRoutes, commentRoute);

/** Error Handling */
router.use((req, res, next) => {
	const error = new Error("Not Found");

	return res.status(404).json({
		message: error.message
	});
});

/** Create the server */

Mongoose.connect(config.SERVER.url)
	.then(() =>
		router.listen(config.SERVER.port, () => {
			logging.info(
				NAMESPACE,
				`Server is running on ${config.SERVER.hostname}:${config.SERVER.port}`
			);
		})
	)
	.catch((error) => console.log(`${error} did not connect`));
