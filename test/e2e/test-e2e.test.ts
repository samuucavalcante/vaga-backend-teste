import request from "supertest";
import { describe, it, expect } from "vitest";
import path from "path";
import { app } from "../../src/server";

describe("Vaga Backend Teste", async () => {
  it("shoud be save pokemon in database by xlsx", async () => {
    const pokemonFilePath = path.resolve(
      __dirname,
      "..",
      "..",
      "Pokemon Go.xlsx",
    );

    const response = await request(app)
      .post(`/pokemon/import-xlsx`)
      .attach("file", pokemonFilePath);
  });

  it("should be paginate pokemon", async () => {
    const response = await request(app).get(`/pokemon`).expect(200);

    expect(response.body.data).toBeDefined();
    expect(response.body.total).toBeDefined();
    expect(response.body.page).toBeDefined();
  });
});
