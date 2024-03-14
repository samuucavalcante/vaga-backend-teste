import { PrismaClient } from "@prisma/client";
import { CreatePokemonDto } from "../dto/create-pokemon.dto";

export class CreatePokemon {
  constructor(private readonly prismaService: PrismaClient) { }

  public async execute(createPokemonDto: CreatePokemonDto) {
    const { status, family, ...pokemonData } = createPokemonDto;

    const familyExists = await this.prismaService.family.findUnique({
      where: { id: family.id },
    });
    if (!familyExists) {
      await this.prismaService.family.create({
        data: { id: family.id },
      });
    }

    // Criar o Pokémon
    const pokemon = await this.prismaService.pokemon.create({
      data: {
        ...pokemonData,
        familyId: family.id,
        status: {
          connectOrCreate: {
            where: {
              pokemonId: status.id,
            },
            create: {
              atk: status.atk,
              sta: status.sta,
              def: status.def,
            },
          },
        },
      },
    });

    return pokemon;
  }
}
