import express from "express";
import { dotenv } from "config/dotenv";
const app = express();

app.use(express.json());

app.listen(dotenv.BACKEND_PORT, () =>
	console.log(`Server is Running on Port ${dotenv.BACKEND_PORT}`),
);
