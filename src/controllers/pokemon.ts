import { NextFunction, Request, Response } from "express";
import { Queue } from "lib/bull/queue";

export class PokemonController {
  constructor(private readonly queue: Queue) { }

  public async importXlsx(
    request: Request,
    response: Response,
    _next: NextFunction,
  ) { }
}
