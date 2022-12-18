import { useState, useEffect, useContext, createContext } from "react";
//Pokemon Types
import { types } from "../pokemonData/pokemonTypes";

/* Defined 2 contexts to handle data for pokédex and evolutions accordingly */
const pokedexContext = createContext();
const evoContext = createContext();

/* Custom hooks that let you use context without importing them */
export function usePokedexContext() {
  return useContext(pokedexContext);
}

export function useEvoContext() {
  return useContext(evoContext);
}

export function GlobalDataProvider({ children }) {
  /* Pokédex main states*/

  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [pkmnShown, setPkmnShown] = useState(50);
  const [modalVisibility, setModalVisibility] = useState("hidden");
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

  {
    /* A dummy object used for unchecking all the selection filters
 whenever the "Load 50 more" and "Hide last 50" buttons are used.
 TypeSelected state is set to dummyTypeSelected.
 Then, TypeFiltersEmpty state is set to true.*/
  }
  const dummyTypeSelected = {
    ...typeSelected,
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
  };

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

  const showMorePokemons = () => {
    setPkmnShown((pkmnShown) => pkmnShown + 50);
  };

  const showLessPokemons = () => {
    if (pkmnShown > 50) {
      setPkmnShown((pkmnShown) => pkmnShown - 50);
    }
  };

  const toggleModal = () => {
    modalVisibility === "hidden"
      ? setModalVisibility("visible")
      : setModalVisibility("hidden");
  };

  const [testValue, setTestValue] = useState(18);

  return (
    <pokedexContext.Provider
      value={{
        pokemons,
        setPokemons,
        allPokemons,
        setAllPokemons,
        search,
        setSearch,
        pkmnShown,
        setPkmnShown,
        typeSelected,
        setTypeSelected,
        typesFiltered,
        setTypesFiltered,
        searchPokemons,
        searchAllPokemons,
        handleChange,
        filterPokemon,
        showLessPokemons,
        showMorePokemons,
        handleCheckbox,
        modalVisibility,
        toggleModal,
        types,
      }}
    >
      <evoContext.Provider value={testValue}>{children}</evoContext.Provider>
    </pokedexContext.Provider>
  );
}
