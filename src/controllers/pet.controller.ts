import { Request, Response } from "express";
import {
	getPet as getPetModel,
	setPet,
	createNewPet,
} from "../models/pet.model";
import { feedPet, healPet, playPet } from "../services/pet.service";

export const getPet = (_req: Request, res: Response) => {
	const pet = getPetModel();
	res.json(pet);
};

export const createPet = (req: Request, res: Response) => {
	const { name } = req.body;
	if (!name) return res.status(400).json({ error: "A name is required" });

	const newPet = createNewPet(name);
	setPet(newPet);
	res.status(201).json(newPet);
};

export const feed = (req: Request, res: Response) => {
	const updatedPet = feedPet();
	res.json(updatedPet);
};

export const heal = (req: Request, res: Response) => {
	const updatedPet = healPet();
	res.json(updatedPet);
};

export const play = (_req: Request, res: Response) => {
	const updatedPet = playPet();
	res.json(updatedPet);
};
