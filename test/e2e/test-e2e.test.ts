import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { app } from "../../src/server";
import path from "path";
import { dotenv } from "config/dotenv";
import { createServer } from "http";
import { spawnSync } from "child_process";

describe("Vaga Backend Teste", async () => {
  const httpUrl = dotenv.BACKEND_URL + ":" + dotenv.BACKEND_PORT;
  const httpClient = createServer().listen(8080);
  let httpPid: number;

  beforeAll(async () => {
    const commandStartApplication = spawnSync("yarn", [
      "tsx",
      "../../src/queue.ts",
    ]);
    httpPid = commandStartApplication.pid;
  });

  afterAll(() => {
    process.kill(httpPid);
  });

  it("shoud be save pokemon in database by xlsx", async () => {
    const pokemonFilePath = path.resolve(
      __dirname,
      "..",
      "..",
      "Pokemon Go.xlsx",
    );

    const response = await request(httpClient)
      .post(`${httpUrl}/pokemon/import-xlsx`)
      .attach("file", pokemonFilePath);

    console.log(response);
  });
});
