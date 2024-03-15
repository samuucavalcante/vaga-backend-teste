import { PrismaClient } from "@prisma/client";
import { PaginaPokemonParams } from "dto/paginate-pokemon.dto";

export class PaginatePokemon {
  constructor(private readonly prismaService: PrismaClient) { }

  public async execute(params: PaginaPokemonParams) {
    const page = params.page || 1;
    const size = 10;

    const total = await this.prismaService.pokemon.count();

    const pokemons = await this.prismaService.pokemon.findMany({
      skip: page - 1,
      take: size,
      orderBy: {
        name: "desc",
      },
      where: {
        name: {
          contains: params.name,
        },
      },
    });

    return { ...pokemons, total };
  }
}
