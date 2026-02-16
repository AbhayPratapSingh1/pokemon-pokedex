const main = async () => {
  const rawData = await Deno.readTextFile("./pokemon/firstGen.json");
  const pokemons = JSON.parse(rawData);
  const allTypes = [];

  for (const pokemon of pokemons) {
    const types = pokemon.types;

    for (const type of types) {
      if (!(allTypes.includes(type))) {
        allTypes.push(type);
      }
    }
  }

  return allTypes;
};

main();
