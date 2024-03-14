import { Family, Pokemon, Prisma, Status } from "@prisma/client";

export type CreatePokemonDto = Omit<Pokemon, "statusId" | "familyId"> & {
  status: Status;
  family: Family;
};
