const fs = require('fs').promises

const getPokemonData = async () => {
    const pokemonArray = [];
  for (let i = 1; i < 1009; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();
    pokemonArray.push(data);
  }
  fs.writeFile('./pokemon-data.json', JSON.stringify(pokemonArray, null, 4))

}

const getGenerationData = async () => {
    const generationArray = [];
  for (let i = 1; i < 10; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/generation/${i}`);
    const data = await res.json();
    generationArray.push(data);
  }
  fs.writeFile('./generation-data.json', JSON.stringify(generationArray, null, 4))

}

getGenerationData()