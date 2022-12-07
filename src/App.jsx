import { useEffect, useState } from "react";
import Button from "./components/Button";
import PokeCard from "./components/PokeCard";
import { RxThickArrowLeft } from "react-icons/rx";
import { RxThickArrowRight } from "react-icons/rx";

const App = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const [evoResults, setEvoResults] = useState([]);

  useEffect(() => {
    searchPokemon(pokemonId);
  }, [pokemonId]);

  const searchPokemon = async (id) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${id}/`
    );
    const data = await response.json();

    let evolutionResults = [];
    let name = data.chain.species.name;
    let image = await getPokemonImage(name);
    evolutionResults.push([name, image]);

    if (data.chain.evolves_to.length !== 0) {
      let nameEvo2 = data.chain.evolves_to[0].species.name;
      let imageEvo2 = await getPokemonImage(nameEvo2);
      evolutionResults.push([nameEvo2, imageEvo2]);
      console.log(evolutionResults);
      if (data.chain.evolves_to[0].evolves_to.length !== 0) {
        let nameEvo3 = data.chain.evolves_to[0].evolves_to[0].species.name;
        let imageEvo3 = await getPokemonImage(nameEvo3);
        evolutionResults.push([nameEvo3, imageEvo3]);
        console.log(evolutionResults);
      }
    }
  };

  const getPokemonImage = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await response.json();
    return data.sprites.front_default;
  };

  //Button functions
  const showPreviousPkmn = () => {
    pokemonId === 1 ? setPokemonId(1) : setPokemonId(pokemonId - 1);
  };

  const showNextPkmn = () => {
    setPokemonId(pokemonId + 1);
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-400">
        Pokemon Cards!
      </h1>
      <main className="flex">
        <Button
          className=""
          icon={<RxThickArrowLeft />}
          clickHandler={showPreviousPkmn}
        />
        <PokeCard cardImage="" />
        <Button
          className=""
          icon={<RxThickArrowRight />}
          clickHandler={showNextPkmn}
        />
      </main>
    </>
  );
};

export default App;
