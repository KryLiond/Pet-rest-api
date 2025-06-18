import express from "express";
import petRouter from "./routes/pet.routes";
import { updatePetState } from "./models/pet.model";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
	res.on("finish", () => {
		console.log(
			`[${new Date().toISOString()}] ${req.method} ${
				req.originalUrl
			} | Status: ${res.statusCode}`
		);
	});

	next();
});

app.use(petRouter);

setInterval(() => {
	const _updatedPet = updatePetState();
}, 60 * 1000);

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
	console.log(`Server is running on https://localhost:${PORT}`);
});
