import { PrismaClient } from "@prisma/client";
import { PokemonXlsxDto } from "dto/pokemon-xslx";
import { CreatePokemon } from "useCases/create-pokemon";
import { formatPokemon } from "../helpers/formatPokemon";

const prismaService = new PrismaClient();
const createPokemon = new CreatePokemon(prismaService);

export const CreatePokemonJob = {
  key: "create-pokemon",
  async handle(data: PokemonXlsxDto) {
    console.log(data["Img name"]);
    const parseData = formatPokemon(data);
    try {
      const pokemon = await createPokemon.execute(parseData);
      console.log(pokemon.id, "pokemon created");
    } catch (err) {
      console.error(err);
    }
  },
};
