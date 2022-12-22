// Hooks
import { useState, useEffect, useContext, createContext } from "react";
// Pokemon Types
import { colors, types } from "../pokemonData/pokemonTypes";

const pokedexContext = createContext();

/* Custom hook that let you use context without importing them */
export function usePokedexContext() {
  return useContext(pokedexContext);
}

export function PokedexProvider({ children }) {
  /* Pokédex states*/
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [idSelected, setIdSelected] = useState(1);
  const [search, setSearch] = useState("");
  const [pkmnShown, setPkmnShown] = useState(50);
  const [typesFiltered, setTypesFiltered] = useState([]);
  const [typeSelected, setTypeSelected] = useState({
    normal: false,
    grass: false,
    fire: false,
    water: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    steel: false,
    fairy: false,
  });

  useEffect(() => {
    searchAllPokemons();
  }, []);

  useEffect(() => {
    searchPokemons(pkmnShown);
  }, [pkmnShown]);

  useEffect(() => {
    if (search.length === 0) {
      if (Object.values(typeSelected).every((value) => value === false)) {
        searchPokemons(pkmnShown);
      } else if (Object.values(typeSelected).some((value) => value === true)) {
        setPokemons(typesFiltered);
      }
    }
  }, [typeSelected]);

  const searchPokemons = async (pkmnShown) => {
    const initialURL = "https://pokeapi.co/api/v2/";
    const response50 = await fetch(
      `${initialURL}pokemon/?offset=${0}&limit=${pkmnShown}`
    );

    const PokemonData50 = await response50.json();

    /*The first API call only brings a name and a URL for each Pokémon.
    These results are used to make a 2nd call to each one of the URLs,
    the data is stored inside an array of promises named "promises" */
    const promises50 = PokemonData50.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      return data;
    });

    const Pokemon50 = await Promise.all(promises50);
    setPokemons(Pokemon50);
  };

  /* Pokeapi search */
  const searchAllPokemons = async (limit = 100000) => {
    const initialURL = "https://pokeapi.co/api/v2/";
    const responseAll = await fetch(
      `${initialURL}pokemon/?offset=${0}&limit=${limit}`
    );
    const AllPokemonData = await responseAll.json();

    const promisesAll = AllPokemonData.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      return data;
    });

    const PokemonFull = await Promise.all(promisesAll);
    setAllPokemons(PokemonFull);
  };

  /* Searchbar functions */
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      if (Object.values(typeSelected).every((value) => value === false)) {
        searchPokemons(pkmnShown);
      } else if (Object.values(typeSelected).some((value) => value === true)) {
        setPokemons(typesFiltered);
      }
    } else {
      if (Object.values(typeSelected).every((value) => value === false)) {
        filterPokemon(e.target.value);
      } else if (Object.values(typeSelected).some((value) => value === true)) {
        filterPokemon(e.target.value);
      }
    }
  };

  const filterPokemon = (searchTerm) => {
    let foundPkmn = allPokemons.filter((pokemon) => {
      if (
        pokemon.id.toString() === searchTerm ||
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return pokemon;
      }
    });
    setPokemons(foundPkmn);
  };

  /* Type filters functions */
  const handleCheckbox = (e) => {
    setTypeSelected({
      ...typeSelected,
      [e.target.value]: e.target.checked,
    });

    if (e.target.checked) {
      const typesResult = allPokemons.filter(
        (pokemon) => pokemon.types[0].type.name === e.target.value
      );
      setTypesFiltered([...typesFiltered, ...typesResult]);
    } else {
      const typesResult = typesFiltered.filter(
        (pokemon) => pokemon.types[0].type.name !== e.target.value
      );
      setTypesFiltered([...typesResult]);
    }
  };

  /* Display 50 more/less pkmn */
  const showMorePokemons = () => {
    if (Object.values(typeSelected).every((value) => value === false)) {
      setPkmnShown((pkmnShown) => pkmnShown + 50);
    }
  };

  const showLessPokemons = () => {
    if (Object.values(typeSelected).every((value) => value === false)) {
      if (pkmnShown > 50) {
        setPkmnShown((pkmnShown) => pkmnShown - 50);
      }
    }
  };

  return (
    <pokedexContext.Provider
      value={{
        pokemons,
        search,
        handleChange,
        handleCheckbox,
        types,
        colors,
        idSelected,
        setIdSelected,
        showLessPokemons,
        showMorePokemons,
      }}
    >
      {children}
    </pokedexContext.Provider>
  );
}
