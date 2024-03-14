import { PrismaClient } from "@prisma/client";
import { type CreatePokemonDto } from "../dto/create-pokemon.dto";

export class CreatePokemon {
  constructor(private readonly prismaService: PrismaClient) { }

  public async execute(createPokemonDto: CreatePokemonDto) {
    const { status, familyId, ...pokemon } = createPokemonDto;

    const familyExists = await this.prismaService.family.findUnique({
      where: { id: familyId },
    });

    if (!familyExists) await this.prismaService.family.create({});

    return await this.prismaService.pokemon.create({
      data: {
        ...pokemon,
        status,
      },
    });
  }
}
