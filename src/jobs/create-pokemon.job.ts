import { PrismaClient } from "@prisma/client";
import { CreatePokemonDto } from "dto/create-pokemon.dto";
import { CreatePokemon } from "useCases/create-pokemon";

const prismaService = new PrismaClient();

export class CreatePokemonJob {
  private readonly createPokemon: CreatePokemon = new CreatePokemon(
    prismaService,
  );

  constructor() { }

  public get key() {
    return "create-job";
  }

  public async handle(data: CreatePokemonDto) {
    await this.createPokemon.execute(data);
  }
}
