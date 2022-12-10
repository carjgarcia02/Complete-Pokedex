//Components
import Searchbar from "./SearchBar";
import Filters from "./Filters";
import PokemonCard from "./PokemonCard";
//Hooks
import { useState, useEffect } from "react";
//Icons
import { BiSearch } from "react-icons/bi";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    searchPokemons();
  }, []);

  const searchPokemons = async (limit = 500) => {
    const initialURL = "https://pokeapi.co/api/v2/";
    const response = await fetch(
      `${initialURL}pokemon/?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();

    /*The first API call only brings a name and a URL for each Pokémon.
    These results are used to make a 2nd call to each one of the URLs,
    the data is stored inside an array of promises named "promises" */
    const promises = data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      return data;
    });

    const searchResults = await Promise.all(promises);
    console.log(searchResults);
    setPokemons(searchResults);
    setAllPokemons(searchResults);
  };

  /* Searchbar functions*/
  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    filterPokemon(e.target.value);
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

  return (
    <div className="w-full h-screen px-2 py-8 font-Patrick">
      {/* Pokédex header */}
      <header className="flex w- justify-between">
        <h1>Pokédex</h1>
        {/* Pokémon searchbar */}
        <div className="mr-8">
          <div className="flex justify-center items-center">
            <input
              className="border-2 text-lg px-2 py-1 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              value={search}
              placeholder="Find Pokémon by name or id"
              onChange={handleChange}
            />
            <button className="bg-green-500 hover:bg-green-600 text-white text-2xl px-2 py-2  rounded-md clic">
              <BiSearch />
            </button>
          </div>
        </div>
      </header>

      {/* Main section */}
      <main className="flex-col 2xl:flex">
        {/* Filter bar */}
        <section>Filter bar</section>
        {/* Search Results */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-items-end p-6">
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
                  /* Array with both types capitalized */
                  /* pkmn.types[0].type.name.charAt(0).toUpperCase() +
                    pkmn.types[0].type.name.slice(1),
                  pkmn.types[1].type.name.charAt(0).toUpperCase() +
                    pkmn.types[1].type.name.slice(1) */
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
                typesArray={[
                  /* Array with 1 type capitalized */
                  /* pkmn.types[0].type.name.charAt(0).toUpperCase() +
                    pkmn.types[0].type.name.slice(1) */
                  pkmn.types[0].type.name.toUpperCase(),
                ]}
              />
            )
          )}
        </section>
      </main>
    </div>
  );
};

export default Pokedex;
