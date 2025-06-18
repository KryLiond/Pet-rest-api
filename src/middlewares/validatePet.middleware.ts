import { Request, Response, NextFunction } from "express";
import { getPet } from "../models/pet.model";

export const validatePet = (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	const pet = getPet();
	if (!pet) return res.status(404).json({ error: "Pet not found" });
	if (pet.status === "dead")
		return res.status(410).json({ error: "Pet is dead" });
	next();
};
