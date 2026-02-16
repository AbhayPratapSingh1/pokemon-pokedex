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

const addToHTMLTemplate = (data, sideBar, title, page = "all") => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <title>${title}</title>
  <link rel="stylesheet" href="/css/style.css">
  <style>
    .${page}-bar{
      background: var(--theme-${page});
      color: white;
    }
  </style>
</head>

<body>
  <div class="main-box">
  ${sideBar}
${data}
</div
</body>
</html>`;
};

const createSideBar = (types) => {
  const data = types.map((type) => {
    return `<a class="${type.toLowerCase()}-bar" href="/${type.toLowerCase()}.html">
        <div class="bar">${capitalize(type)}</div>
      </a>
    `;
  });

  return `<div class="side-bar">
        ${data.join("")}
    </div>
  `;
};

const createSinglePage = (
  filterCriteria = () => true,
  savingPath = "./index.html",
  type = "all",
) => {
  const rawPokemons = Deno.readTextFileSync("./pokemon/firstGen.json");
  const rawTypes = Deno.readTextFileSync("./pokemon/types.json");
  const pokemons = JSON.parse(rawPokemons);
  const types = JSON.parse(rawTypes);
  const filteredPokemon = pokemons.filter(filterCriteria);
  const cards = createCards(filteredPokemon);
  const sideBar = createSideBar(["all", ...types]);
  const htmlPage = addToHTMLTemplate(cards, sideBar, "Pokemon", type);

  Deno.writeTextFileSync(`${savingPath}`, htmlPage);
};

// main(({ types }) => types.includes("bug"), "./bug.html", "bug");

const generatAllPages = () => {
  const rawTypes = Deno.readTextFileSync("./pokemon/types.json");
  const types = JSON.parse(rawTypes);
  // for all pokemon
  createSinglePage(() => true, `./all.html`, "all");
  createSinglePage(() => true, `./index.html`, "all");

  types.forEach((type) => {
    createSinglePage(
      ({ types }) => types.includes(type),
      `./${type}.html`,
      type,
    );
  });
};

generatAllPages();
