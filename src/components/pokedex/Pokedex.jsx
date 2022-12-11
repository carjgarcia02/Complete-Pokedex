//Components
import Searchbar from "./SearchBar";
import Filters from "./Filters";
import PokemonCard from "./PokemonCard";
//Hooks
import { useState, useEffect } from "react";
//Icons
import { BiSearch } from "react-icons/bi";
//Pokemon Types
import { types } from "../../pokemonData/pokemonTypes";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [pkmnShown, setPkmnShown] = useState(50);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    searchAllPokemons();
  }, []);

  useEffect(() => {
    searchPokemons(pkmnShown);
  }, [pkmnShown]);

  const searchPokemons = async (pkmnShown) => {
    const initialURL = "https://pokeapi.co/api/v2/";
    const response50 = await fetch(
      `${initialURL}pokemon/?offset=${offset}&limit=${pkmnShown}`
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
      `${initialURL}pokemon/?offset=${offset}&limit=${limit}`
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

  /* Searchbar functions*/
  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setSearch(e.target.value);
      filterPokemon(e.target.value);
      console.log(e.target.value);
    } else if (e.target.value.length === 0) {
      setSearch(e.target.value);
      searchPokemons(pkmnShown);
      console.log(`valor: ${e.target.value}`);
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

  const showMorePokemons = () => {
    setPkmnShown((pkmnShown) => pkmnShown + 50);
    console.log(allPokemons.length);
  };

  const showLessPokemons = () => {
    if (pkmnShown > 50) {
      setPkmnShown((pkmnShown) => pkmnShown - 50);
      console.log(allPokemons.length);
    }
  };

  return (
    <div className="w-full h-screen px-2 py-4 font-Patrick">
      {/* Pokédex header */}
      <header className="flex m-auto mb-4 justify-between items-center">
        {/* Pokémon searchbar */}
        <div className="flex m-auto justify-center">
          <input
            type="text"
            className="border-2 text-sm sm:text-lg px-2 py-1 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Find pokémon by name or id"
            value={search}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white text-sm sm:text-xl px-2 py-2 rounded-md clic"
          >
            <BiSearch />
          </button>
        </div>
      </header>

      {/* Main section */}
      <section className="flex flex-col 2xl:flex-row px-4 select-none">
        {/* Filter bar */}
        <div className="p-2 border-2 rounded-md shadow-lg h-fit">
          <h2 className="text-center font-bold mb-3 md:text-lg">
            Filter pokémon by type:
          </h2>
          <div className="flex flex-wrap 2xl:flex-col justify-center gap-2 ">
            {types.map((type) => (
              <Filters
                key={`type-${type.type}`}
                typeName={type.type}
                background={type.bg}
              />
            ))}
          </div>
        </div>

        {/* Pokemon cards grid */}
        <section className="grid w-full grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 justify-items-center p-6">
          {pokemons.map((pkmn) =>
            pkmn.types.length > 1 ? (
              <PokemonCard
                key={`pkmn-${pkmn.name}`}
                id={pkmn.id}
                name={pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1)}
                image={[
                  /* Passing both normal and shiny versions for a toggle button to be implemented */
                  pkmn.sprites.other.home.front_default,
                  pkmn.sprites.other.home.front_shiny,
                ]}
                typesArray={[
                  pkmn.types[0].type.name.toUpperCase(),
                  pkmn.types[1].type.name.toUpperCase(),
                ]}
              />
            ) : (
              <PokemonCard
                key={`pkmn-${pkmn.name}`}
                id={pkmn.id}
                name={pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1)}
                image={[
                  pkmn.sprites.other.home.front_default,
                  pkmn.sprites.other.home.front_shiny,
                ]}
                typesArray={[pkmn.types[0].type.name.toUpperCase()]}
              />
            )
          )}
        </section>
      </section>
      {/* Load more button */}
      <div className="flex select-none">
        <button
          className="m-auto text-sm lg:text-lg px-6 py-3 mb-4 bg-violet-500 text-white rounded-full hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300"
          onClick={showMorePokemons}
        >
          Load 100 more
        </button>
        <button
          className="m-auto text-sm lg:text-lg px-6 py-3 mb-4 bg-violet-500 text-white rounded-full hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300"
          onClick={showLessPokemons}
        >
          Hide last 100
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
