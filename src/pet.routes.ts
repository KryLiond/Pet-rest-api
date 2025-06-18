import express, { Request, Response } from "express";

import { getPet, setPet, createPet, calculateMood } from "./pet.model";

const petRouter = express.Router();

petRouter.get("/pet", (_req: Request, res: Response) => {
	const pet = getPet();
	if (!pet) return res.status(404).json({ error: "Pet not found" });
	if (pet.status === "dead")
		return res.status(410).json({ error: "Pet is dead" });
	res.json(pet);
});

petRouter.post("/pet", (req: Request, res: Response) => {
	const { name } = req.body;
	if (!name) return res.status(400).json({ error: "A name is required" });

	const newPet = createPet(name);
	setPet(newPet);
	res.status(201).json(newPet);
});

petRouter.post("/pet/feed", (_req: Request, res: Response) => {
	const pet = getPet();
	if (!pet) return res.status(404).json({ error: "Pet not found" });
	if (pet.status === "dead")
		return res.status(410).json({ error: "Pet is dead" });

	pet.hunger = Math.max(0, pet.hunger - 30);
	pet.mood = Math.min(100, pet.mood + 10);
	res.json(pet);
});

petRouter.post("/pet/heal", (_req: Request, res: Response) => {
	const pet = getPet();
	if (!pet) return res.status(404).json({ error: "Pet not found" });
	if (pet.status === "dead")
		return res.status(410).json({ error: "Pet is dead" });

	pet.health = Math.min(100, pet.health + 20);
	pet.hunger = Math.max(0, pet.hunger - 10);
	pet.mood = calculateMood(pet.health, pet.hunger);
	res.json(pet);
});

petRouter.post("/pet/play", (_req: Request, res: Response) => {
	const pet = getPet();
	if (!pet) return res.status(404).json({ error: "Pet not found" });
	if (pet.status === "dead")
		return res.status(410).json({ error: "Pet is dead" });

	pet.mood = Math.min(100, pet.mood + 15);
	pet.hunger = Math.min(100, pet.hunger + 5);
	res.json(pet);
});

export default petRouter;
