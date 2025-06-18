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
	// * Никак не сужался тип у currentPet, поэтому создал локальную константу
	const pet = currentPet as Pet | null;
	if (pet === null) return;
	if (pet.status === "dead") return;

	pet.age += 1;
	pet.hunger += 3;

	if (pet.hunger > 70) {
		pet.health -= 5;
	} else {
		pet.health -= 2;
	}

	pet.mood = calculateMood(pet.health, pet.hunger);

	if (pet.health <= 0 || pet.hunger >= 100) {
		pet.status = "dead";
	} else {
		pet.status = pet.health > 30 ? "alive" : "sick";
	}
};

export const calculateMood = (health: number, hunger: number): number => {
	return Math.round((health + (100 - hunger)) / 2);
};

export const getPet = () => currentPet;
export const setPet = (pet: Pet) => {
	currentPet = pet;
};
