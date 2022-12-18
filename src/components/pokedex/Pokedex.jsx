//Components
import Searchbar from "./SearchBar";
import Filters from "./Filters";
import PokemonCard from "./PokemonCard";
//Hooks
import { useState, useEffect } from "react";
//Icons
import { BiSearch } from "react-icons/bi";
//Pokemon Types
/* import { types } from "../../pokemonData/pokemonTypes"; */
//Context
import { usePokedexContext } from "../../context/GlobalDataProvider";

const Pokedex = () => {
  const {
    pokemons,
    search,
    handleChange,
    showLessPokemons,
    showMorePokemons,
    handleCheckbox,
    types,
    checked,
  } = usePokedexContext();

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
            className="bg-green-500 hover:bg-green-600 text-white text-sm sm:text-xl px-2 py-2 rounded-md clic md:bg-red-600 md:hover:bg-red-900 xl:bg-blue-600"
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
            Filter by main type:
          </h2>
          <div className="flex flex-wrap 2xl:flex-col justify-center gap-2 ">
            {types.map((type) => (
              <Filters
                key={`type-${type.type}`}
                typeName={type.type}
                background={type.bg}
                onChange={handleCheckbox}
                checked={checked}
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
          Load 50 more
        </button>
        <button
          className="m-auto text-sm lg:text-lg px-6 py-3 mb-4 bg-violet-500 text-white rounded-full hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300"
          onClick={showLessPokemons}
        >
          Hide last 50
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
