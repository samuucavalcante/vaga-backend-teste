import { CreatePokemonDto } from "dto/create-pokemon.dto";
import { CreatePokemon } from "useCases/create-pokemon";

export class CreatePokemonJob {
  constructor(private readonly createPokemon: CreatePokemon) { }

  public get key() {
    return "create-job";
  }

  public async handle(data: CreatePokemonDto) {
    await this.createPokemon.execute(data);
  }
}
