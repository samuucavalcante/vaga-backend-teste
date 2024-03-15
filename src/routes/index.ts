import { Router } from "express";
import { Queue } from "lib/bull/queue";
import { PokemonController } from "controllers/pokemon";
import { upload } from "config/upload";
import { PaginatePokemon } from "useCases/paginate-pokemon";
import { PrismaClient } from "@prisma/client";

const queue = new Queue();
const prismaService = new PrismaClient();
const paginatePokemon = new PaginatePokemon(prismaService);
const pokemonController = new PokemonController(queue, paginatePokemon);

const appRoutes = Router();
appRoutes.post("/pokemons/import-xlsx", upload.single("file"), (...n) =>
  pokemonController.importXlsx(...n),
);

appRoutes.get("/pokemons", (...n) => pokemonController.paginatePokemon(...n));

export { appRoutes };
