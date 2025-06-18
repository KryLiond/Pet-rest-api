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

export const updatePetState = (): Pet | null => {
	if (!currentPet || currentPet.status === "dead") return null;

	const newHunger = currentPet.hunger + 3;
	const newHealth = currentPet.health - (newHunger > 70 ? 5 : 2);

	let newStatus: PetStatus;
	if (newHealth <= 0 || newHunger >= 100) {
		newStatus = "dead";
	} else {
		newStatus = newHealth > 30 ? "alive" : "sick";
	}

	const updatedPet: Pet = {
		...currentPet,
		age: currentPet.age + 1,
		hunger: newHunger,
		health: newHealth,
		mood: calculateMood(newHealth, newHunger),
		status: newStatus,
	};

	currentPet = updatedPet;
	return updatedPet;
};

export const calculateMood = (health: number, hunger: number): number => {
	return Math.round((health + (100 - hunger)) / 2);
};

export const updatePet = (updates: Partial<Pet>): Pet => {
	if (!currentPet) throw Error("Pet not found");
	return { ...currentPet, ...updates };
};

export const getPet = () => currentPet;
export const setPet = (pet: Pet) => {
	currentPet = pet;
};
