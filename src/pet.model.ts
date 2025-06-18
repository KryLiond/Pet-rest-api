type PetStatus = "alive" | "sick" | "dead";

export interface Pet {
	name: string;
	age: number;
	health: number;
	hunger: number;
	mood: number;
	status: PetStatus;
}

let currentPet: null | Pet = null;

export const createPet = (name: string): Pet => {
	return {
		name,
		age: 0,
		health: 100,
		hunger: 0,
		mood: 100,
		status: "alive",
	};
};

export const updatePetState = (): void => {
	if (!currentPet || currentPet.status === "dead") return;

	currentPet.age += 1;
	currentPet.hunger += 3;

	if (currentPet.hunger > 70) {
		currentPet.health -= 5;
	} else {
		currentPet.health -= 2;
	}

	currentPet.mood = calculateMood(currentPet.health, currentPet.hunger);

	if (currentPet.health <= 0 || currentPet.hunger >= 100) {
		currentPet.status = "dead";
	} else {
		currentPet.status = currentPet.health > 30 ? "alive" : "sick";
	}
};

export const calculateMood = (health: number, hunger: number): number => {
	return Math.round((health + (100 - hunger)) / 2);
};

export const getPet = () => currentPet;
export const setPet = (pet: Pet) => {
	currentPet = pet;
};
