import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../../src/server";
import path from "path";

describe("Vaga Backend Teste", () => {
  it("shoud be save pokemon in database by xlsx", async () => {
    const pokemonFilePath = path.resolve(
      __dirname,
      "..",
      "..",
      "Pokemon Go.xlsx",
    );

    const response = await request(app)
      .post("/pokemon/import-xlsx")
      .attach("file", pokemonFilePath);

    console.log(response);
  });
});
