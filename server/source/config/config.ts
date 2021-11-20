import dotenv from "dotenv";

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb://localhost:27017/";

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: SERVER_PORT,
	url: CONNECTION_URL
};

const config = {
	SERVER
};

export default config;
