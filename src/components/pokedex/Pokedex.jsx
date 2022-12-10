//Components
import Searchbar from "./SearchBar";
import Filters from "./Filters";
import PokemonCard from "./PokemonCard";
//Hooks
import { useState, useEffect } from "react";

const Pokedex = () => {
  const [Pokemons, setPokemons] = useState([]);
  const [AllPokemons, setAllPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    searchPokemons();
  }, []);

  /* useEffect(() => {
    searchAllPokemons();
  }, [offset]); */

  const searchPokemons = async (limit = 1050) => {
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
  };

  return (
    <div className="w-full h-screen font-Patrick">
      {/* Pokédex header */}
      <header className="flex w- justify-between">
        <h1>Pokédex</h1>
        {/* Pokémon searchbar */}
        <div>
          <input type="text" placeholder="Find a Pokémon by its name or id" />
        </div>
      </header>

      {/* Main section */}
      <main className="flex-col 2xl:flex">
        {/* Filter bar */}
        <section>Filter bar</section>
        {/* Search Results */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-items-end p-6">
          {Pokemons.map((pkmn) =>
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
