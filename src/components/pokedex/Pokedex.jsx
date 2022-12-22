//Components
import Searchbar from "./SearchBar";
import Filters from "./Filters";
import PokemonCard from "./PokemonCard";
//Context
import { usePokedexContext } from "../../context/PokedexProvider";

const Pokedex = () => {
  const {
    pokemons,
    search,
    handleChange,
    showLessPokemons,
    showMorePokemons,
    handleCheckbox,
    types,
  } = usePokedexContext();

  return (
    <div className="w-full h-fit px-2 py-4 font-Patrick bg-gradient-to-bl from-white to-slate-100">
      {/* Pokédex header */}
      <header className="flex m-auto mb-4 justify-between items-center">
        {/* Pokémon searchbar */}
        <Searchbar value={search} onChange={handleChange} />
      </header>

      {/* Main section */}
      <section className="flex flex-col 2xl:flex-row px-4 select-none">
        {/* Filter bar */}
        <div className="bg-slate-900 p-2 border-2 border-gray-900 rounded-md shadow-lg h-fit">
          <h2 className="text-stone-100 text-center font-bold mb-3 md:text-lg">
            Filter by main type:
          </h2>
          <div className="flex flex-wrap 2xl:flex-col justify-center gap-2 ">
            {types.map((type) => (
              <Filters
                key={`type-${type.type}`}
                typeName={type.type}
                background={type.bg}
                onChange={handleCheckbox}
              />
            ))}
          </div>
        </div>

        {/* Pokemon cards grid */}
        <section className="grid w-full grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 justify-items-center p-6 gap-x-8">
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
