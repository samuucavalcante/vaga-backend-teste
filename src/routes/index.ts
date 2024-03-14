import { Router } from "express";
import { Queue } from "lib/bull/queue";
import { PokemonController } from "controllers/pokemon";

const queue = new Queue();
const pokemonController = new PokemonController(queue);

const appRoutes = Router();
appRoutes.post("/pokemon/import-xlsx", (...n) =>
  pokemonController.importXlsx(...n),
);

export { appRoutes };
