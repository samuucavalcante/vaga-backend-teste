import { NextFunction, Request, Response } from "express";
import { Queue } from "lib/bull/queue";
import { FileStream } from "../helpers/FileStream";
import { Pokemon } from "@prisma/client";
import { PaginatePokemon } from "useCases/paginate-pokemon";

export class PokemonController {
  constructor(
    private readonly queue: Queue,
    private readonly paginatePokemoUseCase: PaginatePokemon,
  ) { }

  public async importXlsx(
    request: Request,
    response: Response,
    _next: NextFunction,
  ) {
    if (!request.file) return;
    const file = new FileStream(request.file);

    for (const record of file.xlsxToJson()) {
      this.queue.add("create-pokemon", record);
    }

    return response.status(201).json({ success: true });
  }

  public async paginatePokemon(
    request: Request,
    response: Response,
    _next: NextFunction,
  ) {
    const params = request.params;
    const page = +params?.page || 1;
    const name = params?.name || "";

    const pokemons = await this.paginatePokemoUseCase.execute({
      name,
      page,
    });

    return response
      .status(200)
      .json({ total: pokemons.total, success: true, page, data: pokemons });
  }
}
