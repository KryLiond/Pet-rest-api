import express from "express";
import { validatePet } from "../middlewares/validatePet.middleware";
import {
	createPet,
	feed,
	getPet,
	heal,
	play,
} from "../controllers/pet.controller";

const petRouter = express.Router();

petRouter.get("/pet", validatePet, getPet);
petRouter.post("/pet", createPet);
petRouter.post("/pet/feed", validatePet, feed);
petRouter.post("/pet/heal", validatePet, heal);
petRouter.post("/pet/play", validatePet, play);

export default petRouter;
