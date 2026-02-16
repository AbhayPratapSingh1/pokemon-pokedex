export const createTag = (tag, opt) => (data, value) =>
  `<${tag} ${opt}="${value}">${data}</${tag}>`;

export const cardsTag = createTag("div", "class");

export const getImage = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const capitalize = (name) => {
  if (name.length === 0) {
    return "";
  }
  return name[0].toUpperCase() + name.slice(1);
};
