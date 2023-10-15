const fs = require('fs').promises
const testPokemonData = './test-data/test-pokemon-data.json'
const testGenerationData = './test-data/test-generation-data.json'
const { filterByNameAndTypes, reduceGenerationDataToPokemon, filterByGeneration } = require('../sortByGeneration')

describe("filterByNameAndTypes", () => {
    test("should return an array", () => {
      return filterByNameAndTypes(testPokemonData)
        .then(({pokemonArray}) => {
          expect(Array.isArray(pokemonArray)).toBe(true)
        });
    });
    test("should return an array of objects with name as a key", () => {
        return filterByNameAndTypes(testPokemonData)
          .then(({pokemonArray}) => {
            expect(pokemonArray[0].name).toBe('bulbasaur')
          });
      });
    test("should return an array of objects with an array of types as a key", () => {
        return filterByNameAndTypes(testPokemonData)
          .then(({pokemonArray}) => {
            expect(Array.isArray(pokemonArray[0].types)).toBe(true)
          });
      });
    test("should return an array of objects with an array of types as a key", () => {
        return filterByNameAndTypes(testPokemonData)
          .then(({pokemonArray}) => {
            expect(Array.isArray(pokemonArray[0].types)).toBe(true)
          });
      });
    test("array of types should contain one or two types as strings", () => {
        return filterByNameAndTypes(testPokemonData)
          .then(({pokemonArray}) => {
            expect(pokemonArray[0].types[0]).toBe('grass')
          });
      });
    test.only("will only take types from the first generation it appears", () => {
        return filterByNameAndTypes(testPokemonData)
          .then(({pokemonArray}) => {
            expect(pokemonArray[2].types[0]).toBe('electric')
            expect(pokemonArray[2].types[1]).toBe(undefined)
          });
      });
  });

  describe("reduceGenerationDataToPokemon", () => {
    test("should return an array of objects", () => {
      return reduceGenerationDataToPokemon(testGenerationData)
        .then((generationData) => {
          expect(Array.isArray(generationData)).toBe(true)
        });
    });
    test("each object should contain an array of pokemon", () => {
      return reduceGenerationDataToPokemon(testGenerationData)
        .then((generationData) => {

            expect(generationData[0][0][0]).toBe('bulbasaur')
        });
    });
  });

  describe("filterByGeneration", () => {
    test("should return an array of objects", () => {
      return filterByGeneration(testPokemonData, testGenerationData)
        .then(({generationData}) => {
          expect(Array.isArray(generationData)).toBe(true)
          expect(typeof generationData[0]).toBe('object')
        });
    });
    test("each object should have a key of types and a key of pokemon", () => {
      return filterByGeneration(testPokemonData, testGenerationData)
        .then(({generationData}) => {
          expect(generationData[0][0]).toHaveProperty('types')
          expect(generationData[0][0]).toHaveProperty('pokemon')
        });
    });
    test("each type object should have one or more types", () => {
      return filterByGeneration(testPokemonData, testGenerationData)
        .then(({generationData}) => {
          expect(generationData[0][0].types).toHaveProperty('grass')
          expect(generationData[0][0].types).toHaveProperty('poison')
        });
    });
    test("each type should have an array of pokemon", () => {
      return filterByGeneration(testPokemonData, testGenerationData)
        .then(({generationData}) => {
          expect(generationData[0][0].pokemon.grass[0]).toBe('bulbasaur')
          expect(generationData[0][0].pokemon.poison[1]).toBe('ivysaur')
        });
    });
    test("each type should keep a count of how many pokemon of that type there are", () => {
      return filterByGeneration(testPokemonData, testGenerationData)
        .then(({generationData}) => {
          expect(generationData[0][0].types.grass).toBe(2)
        });
    });
  });