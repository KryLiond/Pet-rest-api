import express, { Request, Response } from "express";
import { validatePet } from "./validatePet.middleware";
import {
	getPet,
	setPet,
	createPet,
	calculateMood,
	updatePet,
} from "./pet.model";

const petRouter = express.Router();

petRouter.get("/pet", validatePet, (_req: Request, res: Response) => {
	const pet = getPet();
	res.json(pet);
});

petRouter.post("/pet", (req: Request, res: Response) => {
	const { name } = req.body;
	if (!name) return res.status(400).json({ error: "A name is required" });

	const newPet = createPet(name);
	setPet(newPet);
	res.status(201).json(newPet);
});

petRouter.post("/pet/feed", validatePet, (_req: Request, res: Response) => {
	const pet = getPet();
	const updatedPet = updatePet({
		hunger: Math.max(0, pet!.hunger - 30),
		mood: Math.min(100, pet!.mood + 10),
	});

	setPet(updatedPet);
	res.json(updatedPet);
});

petRouter.post("/pet/heal", validatePet, (_req: Request, res: Response) => {
	const pet = getPet();
	const newHealth = Math.min(100, pet!.health + 20);
	const newHunger = Math.max(0, pet!.hunger - 10);

	const updatedPet = updatePet({
		health: newHealth,
		hunger: newHunger,
		mood: calculateMood(newHealth, newHunger),
	});

	setPet(updatedPet);
	res.json(updatedPet);
});

petRouter.post("/pet/play", validatePet, (_req: Request, res: Response) => {
	const pet = getPet();
	const updatedPet = updatePet({
		mood: Math.min(100, pet!.mood + 15),
		hunger: Math.min(100, pet!.hunger + 5),
	});

	setPet(updatedPet);
	res.json(updatedPet);
});

export default petRouter;
