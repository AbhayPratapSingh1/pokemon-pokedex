import { getImage } from "./utility.js";

const fetchSinglePokemon = async (id) => {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (data.ok) {
    const pokemonData = await data.json();
    return { data: pokemonData, isError: false };
  }
  return { data: data, isError: true };
};

const parseStats = (stats) => {
  const pokemonStat = {};
  for (const stat of stats) {
    pokemonStat[stat.stat.name] = stat.base_stat;
  }
  return pokemonStat;
};

const parseData = (data) => {
  const parsedData = {
    name: data.name,
    types: data.types.map((each) => each.type.name),
    imageSrc: getImage(data.id),
    stats: parseStats(data.stats),
  };

  parsedData.stats.height = data.height;
  parsedData.stats.weight = data.weight;
  parsedData.stats["base exp"] = data.base_experience;

  return parsedData;
};

const fetchAllFirstGenPokemon = async (st = 1, end = 151) => {
  const data = [];
  for (let id = st; id <= end; id++) {
    const pokemon = await fetchSinglePokemon(id);

    data.push(parseData(pokemon.data));
  }
  return data;
};

const main = async () => {
  const allPokemon = await fetchAllFirstGenPokemon();

  Deno.writeTextFileSync("./pokemon/firstGen.json", JSON.stringify(allPokemon));
};
main();
