const fs = require('fs').promises
const pokemonData = './pokemon-data.json'
const generationData = './generation-data.json'

const removeMoveListsFromPokemon = async () => {
    const fileArray = await fs.readFile(pokemonData, 'utf-8')
    const parsedFileArray = JSON.parse(fileArray)

    parsedFileArray.forEach((pokemon) => {
        delete pokemon.moves
    })
    fs.writeFile('./pokemon-data.json', JSON.stringify(parsedFileArray, null, 4))
}

const filterByNameAndTypes = async (filePath) => {
    pokemonArray = []

    const fileArray = await fs.readFile(filePath, 'utf-8')
    const parsedFileArray = JSON.parse(fileArray)

    console.log('magnemite past types', parsedFileArray[2].past_types)

    parsedFileArray.forEach((pokemon) => {
        const pokemonObject = {
            name: pokemon.name,
        }
        if (pokemon.past_types.length === 0) {
            pokemonObject.types = [pokemon.types[0].type.name, pokemon.types[1]?.type.name]
        } else {
            console.log(pokemon.past_types)
            pokemonObject.types = [pokemon.past_types[0].types[0].type.name, pokemon.past_types[0].types[1]?.type.name,]
        }
        pokemonArray.push(pokemonObject)
    })

    return {pokemonArray}
}

const reduceGenerationDataToPokemon = async (filePath) => {
    const reducedGenerationArray = []
    const generationArray = await fs.readFile(filePath, 'utf-8')
    const parsedGenerationArray = JSON.parse(generationArray)
    parsedGenerationArray.forEach((generation, i) => {
        const generationObject = {[i]: []}
        generation.pokemon_species.forEach((pokemon) => {
            generationObject[i].push(pokemon.name)
        })
        reducedGenerationArray.push(generationObject)
    })
    return reducedGenerationArray
}

const filterByGeneration = async (filePath, generationFilePath) => {
    const generationData = []
    const filteredPokemon = await filterByNameAndTypes(filePath)
    const generationArray = await reduceGenerationDataToPokemon(generationFilePath)
    generationArray.forEach((generation, i) => {
        const generationObject = {
            [i]: {
                types: {},
                pokemon: {},
            }}
        filteredPokemon.pokemonArray.forEach((pokemon) => {
            if (generation[i].includes(pokemon.name)) {
                if (generationObject[i].types[pokemon.types[0]]) {
                    generationObject[i].types[pokemon.types[0]] += 1
                    generationObject[i].pokemon[pokemon.types[0]].push(pokemon.name)
                } else {
                    generationObject[i].types[pokemon.types[0]] = 1
                    generationObject[i].pokemon[pokemon.types[0]] = [pokemon.name]
                }
                if (pokemon.types[1]) {
                    if (generationObject[i].types[pokemon.types[1]]) {
                        generationObject[i].types[pokemon.types[1]] += 1
                        generationObject[i].pokemon[pokemon.types[1]].push(pokemon.name)
                    } else {
                        generationObject[i].types[pokemon.types[1]] = 1
                        generationObject[i].pokemon[pokemon.types[1]] = [pokemon.name]
                    }
                }
            }
        })
        generationData.push(generationObject)
    })
    fs.writeFile('./pokemon-types-by-generation.json', JSON.stringify(generationData, null, 4))
    return {generationData}
}

// filterByGeneration(pokemonData, generationData)
module.exports = { filterByNameAndTypes, reduceGenerationDataToPokemon, filterByGeneration }
