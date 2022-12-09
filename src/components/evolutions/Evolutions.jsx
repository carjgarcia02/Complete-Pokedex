//Components
import EvoHeader from "./EvoHeader";
import EvoCard from "./EvoCard";
import NotFound from "./NotFound";
import Button from "./Button";
//Images
import Pokeball from "../../images/pokeball.png";
//React-icons
import { RxThickArrowLeft } from "react-icons/rx";
import { RxThickArrowRight } from "react-icons/rx";
//Hooks
import { useEffect, useState } from "react";

const Evolutions = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const [evoResults, setEvoResults] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    searchPokemon(pokemonId);
  }, [pokemonId]);

  /* Functions used to retreive names and images.
  The images come from a different url. */
  const searchPokemon = async (id) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/evolution-chain/${id}/`
      );
      const data = await response.json();
      //An array filled with the evolution chain from the searched Pokemon.
      let evolutionResults = [];

      let name = data.chain.species.name;
      let image = await getPokemonImage(name);
      evolutionResults.push([name, image]);

      if (data.chain.evolves_to.length !== 0) {
        let nameEvo2 = data.chain.evolves_to[0].species.name;
        let imageEvo2 = await getPokemonImage(nameEvo2);
        evolutionResults.push([nameEvo2, imageEvo2]);
        if (data.chain.evolves_to[0].evolves_to.length !== 0) {
          let nameEvo3 = data.chain.evolves_to[0].evolves_to[0].species.name;
          let imageEvo3 = await getPokemonImage(nameEvo3);
          evolutionResults.push([nameEvo3, imageEvo3]);
        }
      }
      setEvoResults(evolutionResults);
      setError(false);
    } catch (err) {
      setError(true);
      console.log("Evolution Chain Not Found");
    }
  };

  const getPokemonImage = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await response.json();
    return data.sprites.other.home.front_default;
  };

  //Button functions
  const showPreviousPkmn = () => {
    pokemonId == 1 ? setPokemonId(399) : setPokemonId(Number(pokemonId) - 1);
  };

  const showNextPkmn = () => {
    pokemonId == 399 ? setPokemonId(1) : setPokemonId(Number(pokemonId) + 1);
  };

  //Search function
  const handleChange = (e) => {
    if (e.target.value !== null) {
      const limit = 3; //Max length wanted for the number field
      e.target.value = e.target.value.slice(0, limit);
      setPokemonId(e.target.value.slice(0, limit));
    } else if (e.target.value === NaN) {
      console.log("El campo fue borrado"); //Fix pending
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-full sm:h-screen justify-between items-center mt-6 mb-6 p-6 bg-no-repeat bg-bottom font-Patrick select-none">
        {/* Header message */}
        <EvoHeader />
        <p>
          Showing Evolution Chain{" "}
          <span className="font-bold text-violet-700 text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            # {pokemonId}
          </span>
        </p>

        {/* Main section */}
        <main className="flex w-full justify-center items-center">
          <Button icon={<RxThickArrowLeft />} clickHandler={showPreviousPkmn} />

          <div className="flex flex-col sm:flex-row w-[80%] justify-center items-center gap-3 xl:gap-12">
            {error === false ? (
              evoResults.map((pkmn) => (
                <EvoCard
                  key={`pkmn-${pkmn[0]}`}
                  cardTitle={pkmn[0]}
                  cardImage={pkmn[1]}
                />
              ))
            ) : (
              <NotFound />
            )}
          </div>

          <Button icon={<RxThickArrowRight />} clickHandler={showNextPkmn} />
        </main>

        {/* Search Bar */}
        <div className="flex items-center border-4 gap-6 p-4">
          <div>
            <p className="flex flex-col">
              Search using an evo chain id.
              <br />
              Enter a number (1-399).
            </p>
          </div>
          <input
            className="text-center text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold h-20 w-20 border-4 focus:outline-none"
            type="number"
            min="1"
            max="399"
            maxLength={3}
            onChange={handleChange}
          />
          <img className="w-[60px] h-[60px]" src={Pokeball} alt="A Pokéball" />
        </div>
      </div>
    </>
  );
};

export default Evolutions;
