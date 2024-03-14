import {
	Evolution,
	Generation,
	PokemonType,
	PrismaClient,
	Weather,
} from "@prisma/client";
import { describe, it, expect } from "vitest";
import { CreatePokemon } from "../../src/useCases/create-pokemon";
import { CreatePokemonDto } from "../../src/dto/create-pokemon.dto";

describe("create-pokemon", () => {
	const prismaService = new PrismaClient();
	const createPokemon = new CreatePokemon(prismaService);

	const id = 4;
	console.log({ id });

	it("must be create a pokemon", async () => {
		const payload: CreatePokemonDto = {
			name: `payload_name ${Date.now()}`,
			imgName: "payload_image",
			generation: Generation.one,
			evolutionStage: Evolution.one,
			evolved: true,
			crossGen: true,
			type1: PokemonType.dark,
			type2: PokemonType.bug,
			weather1: Weather.Snow,
			weather2: Weather.Rainy,
			legendary: true,
			aquireable: "3",
			raidable: "3",
			spawns: true,
			regional: true,
			hatchable: "10",
			shiny: true,
			nest: true,
			new: true,
			notGettable: true,
			futureEvolve: true,
			cp40: 20,
			cp39: 30,
			family: {
				id: id,
			},
			status: {
				id: id,
				pokemonId: id,
				atk: 300,
				def: 300,
				sta: 300,
			},
		};

		await expect(createPokemon.execute(payload)).resolves.toHaveProperty("id");
	});
});
