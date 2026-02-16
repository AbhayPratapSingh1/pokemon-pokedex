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
  console.log(allTypes.length);

  Deno.writeTextFileSync("./pokemon/types.json", JSON.stringify(allTypes));
  return allTypes;
};

main();
