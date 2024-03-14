import { Prisma } from "@prisma/client";

export type CreatePokemonDto = Prisma.PokemonCreateInput & {
  status: Prisma.StatusCreateInput;
  familyId: number;
};
