import { Family, Pokemon, Prisma, Status } from "@prisma/client";

export type CreatePokemonDto = Omit<Pokemon, "id" | "statusId" | "familyId"> & {
  status: Status;
  family: Family;
};
