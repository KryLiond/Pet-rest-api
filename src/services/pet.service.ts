import {
	calculateMood,
	getPet,
	Pet,
	setPet,
	updatePet,
} from "../models/pet.model";

export const feedPet = (): Pet => {
	const pet = getPet();
	const updatedPet = updatePet({
		hunger: Math.max(0, pet!.hunger - 30),
		mood: Math.min(100, pet!.mood + 10),
	});

	setPet(updatedPet);
	return updatedPet;
};

export const healPet = (): Pet => {
	const pet = getPet();
	const newHealth = Math.min(100, pet!.health + 20);
	const newHunger = Math.max(0, pet!.hunger - 10);

	const updatedPet = updatePet({
		health: newHealth,
		hunger: newHunger,
		mood: calculateMood(newHealth, newHunger),
	});

	setPet(updatedPet);
	return updatedPet;
};

export const playPet = (): Pet => {
	const pet = getPet();
	const updatedPet = updatePet({
		mood: Math.min(100, pet!.mood + 15),
		hunger: Math.min(100, pet!.hunger + 5),
	});

	setPet(updatedPet);
	return updatedPet;
};
