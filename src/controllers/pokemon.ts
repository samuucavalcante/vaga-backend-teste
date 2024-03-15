import { NextFunction, Request, Response } from "express";
import { Queue } from "lib/bull/queue";
import { FileStream } from "../helpers/FileStream";
import { Pokemon } from "@prisma/client";

export class PokemonController {
  constructor(private readonly queue: Queue) { }

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

    return response.json({ ok: true });
  }
}
