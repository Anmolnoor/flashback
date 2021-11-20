"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const logging_1 = __importDefault(require("./config/logging"));
const sample_1 = __importDefault(require("./routes/sample"));
const NAMESPACE = "Server";
const Router = (0, express_1.default)();
/** Logging the request */
Router.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD - [${req.method}] URL - [${req.url}] IP - [${req.socket.remoteAddress}]`);
    res.on("finish", () => {
        logging_1.default.info(NAMESPACE, `METHOD - [${req.method}] URL - [${req.url}] IP - [${req.socket.remoteAddress}] STATUS - [${req.statusCode}]`);
    });
    next();
});
/** Parse the request */
Router.use(express_1.default.json());
Router.use(express_1.default.urlencoded({ extended: true }));
/** Rule of our API */
Router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authroization, Content-Type, Accept");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
/** Routes */
Router.use("/sample", sample_1.default);
/** Error Handling */
Router.use((req, res, next) => {
    const error = new Error("Not Found");
    return res.status(404).json({
        message: error.message,
    });
});
/** Create the server */
Router.listen(config_1.default.SERVER.port, () => {
    logging_1.default.info(NAMESPACE, `Server is running on ${config_1.default.SERVER.hostname}:${config_1.default.SERVER.port}`);
});
