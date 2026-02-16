import { capitalize, cardsTag } from "./utility.js";

const createTypeTemplate = (types) => {
  return types.map((type) => {
    return `<div class="pokemon-type bg-${type.toLowerCase()}">
              <p>${capitalize(type)}</p>
            </div>
            `;
  }).join("");
};

const TO_SHOW = [
  "height",
  "weight",
  "base exp",
  "hp",
  "attack",
  "defense",
  "speed",
];

const createStats = (stats) => {
  return TO_SHOW.map((stat) => {
    if (stat in stats) {
      return `<div class="field">
                <div class="property">${capitalize(stat)}</div>
                <div class="prop-detail">
                  <p class="">${stats[stat]}</p>
                </div>
              </div>
              `;
    }
    return "";
  }).join("");
};

const createCardTemplate = (name, imageSrc, types, stats) => {
  return `
     <div class="card">
      <div class="image-container">
        <img class="poke-image"
          src="${imageSrc}"
          alt="${capitalize(name)}">
      </div>
      <div class="description">
        <div class="heading">
          <p class="name">
            ${capitalize(name)}
          </p>
          <div class="poke-type">
          ${createTypeTemplate(types)}
          </div>
        </div>

        <!-- DEATILS PARTS OF THE POKEMON -->
        <div class="details">
          ${createStats(stats)}
        </div>
      </div>
    </div>`;
};

const createCards = (pokemonDetails) => {
  const cards = pokemonDetails.map(({ name, imageSrc, types, stats }) =>
    createCardTemplate(name, imageSrc, types, stats)
  ).join("");
  return cardsTag(cards, "cards");
};

const addToHTMLTemplate = (data, title) => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <title>${title}</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
${data}
</body>
</html>`;
};

const main = () => {
  const rawData = Deno.readTextFileSync("./pokemon/firstGen.json");
  const data = JSON.parse(rawData);

  const cards = createCards(data);

  const htmlPage = addToHTMLTemplate(cards, "Pokemon");

  Deno.writeTextFileSync("./index.html", htmlPage);
};

main();
