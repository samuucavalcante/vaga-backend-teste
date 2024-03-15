import { Pokemon } from "@prisma/client";

export interface PaginaPokemonParams {
  page: number;
  name: string;
}
