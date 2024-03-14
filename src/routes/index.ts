import { Router } from "express";
import { Queue } from "lib/bull/queue";
import { PokemonController } from "controllers/pokemon";
import { upload } from "config/upload";

const queue = new Queue();
const pokemonController = new PokemonController(queue);

const appRoutes = Router();
appRoutes.post("/pokemon/import-xlsx", upload.single("file"), (...n) =>
  pokemonController.importXlsx(...n),
);

export { appRoutes };
