const pokeName = document.querySelector("#nombre");
const pokeImg = document.querySelector("#imagen");
const pokeImgContainer = document.querySelector("#imagenCaja");
const pokeId = document.querySelector("#id");
const pokeTypes = document.querySelector("#tipos");
const pokeStats = document.querySelector("#caracteristicas");

const tipoColor = {
  electric: "#FFEA70",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#4A9681",
  psychic: "#FFC6D9",
  ghost: "#561D25",
  bug: "#A2FAA3",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#2F2F2F",
  default: "#2A1A1F",
};

const llamadoPokemon = (event) => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch("https://pokeapi.co/api/v2/pokemon/" + value.toLowerCase())
    .then((data) => data.json())
    .then((response) => datosPokemon(response))
    .catch((err) => pokemonError());
};

const datosPokemon = (data) => {
  const sprite = data.sprites.front_default;
  const { stats, types } = data;

  pokeName.textContent = data.name;
  pokeImg.setAttribute("src", sprite);
  pokeId.textContent = "Nº " + data.id;
  colorPokemon(types);
  tipoPokemon(types);
  pokemonStats(stats);
  if(datosPokemon)  {
    $(".background").attr("class", "changeBackground")
  }
};



const colorPokemon = (types) => {
  const colorUno = tipoColor[types[0].type.name];
  const colorDos = types[1] ? tipoColor[types[1].type.name] : tipoColor.default;
  pokeImg.style.background = `radial-gradient(${colorDos} 33%, ${colorUno} 33%)`;
  pokeImg.style.backgroundSize = " 5px 5px";
};

const tipoPokemon = (types) => {
  pokeTypes.innerHTML = "";
  types.forEach((type) => {
    const typeTextElement = document.createElement("div");
    typeTextElement.style.color = tipoColor[type.type.name];
    typeTextElement.textContent = type.type.name;
    pokeTypes.appendChild(typeTextElement);
  });
};

const pokemonStats = (stats) => {
  pokeStats.innerHTML = "";
  stats.forEach((stat) => {
    const statElement = document.createElement("div");
    const statElementName = document.createElement("div");
    const statElementAmount = document.createElement("div");
    statElementName.textContent = stat.stat.name;
    statElementAmount.textContent = stat.base_stat;
    statElement.appendChild(statElementName);
    statElement.appendChild(statElementAmount);
    pokeStats.appendChild(statElement);
  });
};

const pokemonError = () => {
  pokeName.textContent = "No encontrado";
  pokeImg.setAttribute("src", "/imagenes/IMG_20220402_184033_853.jpg");
  pokeImg.style.background = "#fff";
  pokeTypes.innerHTML = "";
  pokeStats.innerHTML = "";
  pokeId.textContent = "";
};
