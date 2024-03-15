import { PrismaClient } from "@prisma/client";
import { CreatePokemonDto } from "dto/create-pokemon.dto";

export class CreatePokemon {
  constructor(private readonly prismaService: PrismaClient) { }

  public async execute(createPokemonDto: CreatePokemonDto) {
    const { status, family, ...pokemonData } = createPokemonDto;

    const pokemon = await this.prismaService.pokemon.create({
      data: {
        ...pokemonData,
        new: !!pokemonData.new,
        family: family.id
          ? {
            connectOrCreate: {
              where: { id: family?.id },
              create: {},
            },
          }
          : undefined,
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
