import express from "express";
import { dotenv } from "config/dotenv";
import { appRoutes } from "./routes";
export const app = express();

app.use(express.json());

app.use(appRoutes);

app.listen(dotenv.BACKEND_PORT, () =>
	console.log(
		`processId [${process.pid}] -> Server is Running on Port ${dotenv.BACKEND_PORT}`,
	),
);
