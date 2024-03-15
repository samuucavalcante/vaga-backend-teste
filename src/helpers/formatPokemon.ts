import { Generation, Pokemon, PokemonType, Weather } from "@prisma/client";
import { CreatePokemonDto } from "dto/create-pokemon.dto";
import { PokemonXlsxDto } from "dto/pokemon-xslx";

const mapKeys: [keyof PokemonXlsxDto, keyof CreatePokemonDto][] = [
  ["Name", "name"],
  ["Generation", "generation"],
  ["Evolution Stage", "evolutionStage"],
  ["Evolved", "evolved"],
  ["Cross Gen", "crossGen"],
  ["Type 1", "type1"],
  ["Type 2", "type2"],
  ["Weather 1", "weather1"],
  ["Weather 2", "weather2"],
  ["Legendary", "legendary"],
  ["Aquireable", "aquireable"],
  ["Spawns", "spawns"],
  ["Regional", "regional"],
  ["Raidable", "raidable"],
  ["Hatchable", "hatchable"],
  ["Shiny", "shiny"],
  ["Nest", "nest"],
  ["Not-Gettable", "notGettable"],
  ["Future Evolve", "futureEvolve"],
  ["100% CP @ 40", "cp40"],
  ["100% CP @ 39", "cp39"],
];

const generationHandler = (id: number) => {
  if (id === 1) return Generation.one;
  if (id === 2) return Generation.two;
  if (id === 3) return Generation.tree;
  if (id === 4) return Generation.four;
  if (id === 5) return Generation.five;
  if (id === 6) return Generation.six;
  return Generation.seven;
};

const evolutionStageHandler = (id: number) => {
  if (id === 1) return Generation.one;
  if (id === 2) return Generation.two;
  return Generation.tree;
};

const typeHandler = (name: string) => {
  if (name === "grass") PokemonType.grass;
  if (name === "fire") PokemonType.fire;
  if (name === "water") PokemonType.water;
  if (name === "bug") PokemonType.bug;
  if (name === "normal") PokemonType.normal;
  if (name === "poison") PokemonType.poison;
  if (name === "eletric") PokemonType.electric;
  if (name === "ground") PokemonType.ground;
  if (name === "fairy") PokemonType.fairy;
  if (name === "psychic") PokemonType.psychic;
  if (name === "fighting") PokemonType.fighting;
  if (name === "rock") PokemonType.rock;
  if (name === "ghost") PokemonType.ghost;
  if (name === "ice") PokemonType.ice;
  if (name === "dragon") PokemonType.dragon;
  if (name === "steel") PokemonType.steel;
  if (name === "dark") PokemonType.dark;
  return PokemonType.flying;
};

const weatherHandler = (name: string) => {
  if (name === "Sunny/clear") return Weather.SunnyClear;
  if (name === "Rainy") return Weather.Rainy;
  if (name === "Partly cloudy") return Weather.PartlyCloudy;
  if (name === "Cloudy") return Weather.Cloudy;
  if (name === "Windy") return Weather.Windy;
  if (name === "Fog") return Weather.Fog;
  return Weather.Snow;
};

export function formatPokemon(data: PokemonXlsxDto) {
  const parseData = mapKeys.reduce((acc, [key, value]) => {
    // @ts-ignore
    acc[value] = data[key];
    acc["imgName"] = String(data["Img name"]);
    acc["generation"] = generationHandler(data["Generation"]);
    acc["evolutionStage"] = evolutionStageHandler(data["Evolution Stage"]);
    acc["evolved"] = Boolean(data["Evolved"]);
    acc["crossGen"] = Boolean(data["Cross Gen"]);
    acc["legendary"] = Boolean(data["Legendary"]);
    acc["spawns"] = Boolean(data["Spawns"]);
    acc["regional"] = Boolean(data["Regional"]);
    acc["shiny"] = Boolean(data["Shiny"]);
    acc["nest"] = Boolean(data["Nest"]);
    acc["notGettable"] = Boolean(data["Not-Gettable"]);
    acc["futureEvolve"] = Boolean(data["Future Evolve"]);

    acc["type1"] = typeHandler(data["Type 1"]);
    acc["type2"] = typeHandler(data["Type 2"]);
    acc["weather1"] = weatherHandler(data["Weather 1"]);
    acc["weather2"] = weatherHandler(data["Weather 2"]);
    acc["status"] = {
      id: data["Row"],
      pokemonId: data["Row"],
      atk: data["ATK"],
      def: data["DEF"],
      sta: data["STA"],
    };
    acc["family"] = {
      id: data["FamilyID"],
    };

    return acc;
  }, {} as CreatePokemonDto);

  return parseData;
}
