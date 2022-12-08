//Components
import Button from "./Button";
import EvoCard from "./EvoCard";
//React-icons
import { RxThickArrowLeft } from "react-icons/rx";
import { RxThickArrowRight } from "react-icons/rx";
//Hooks
import { useEffect, useState } from "react";

const Evocards = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const [evoResults, setEvoResults] = useState([]);

  useEffect(() => {
    searchPokemon(pokemonId);
  }, [pokemonId]);

  /* Functions used to retreive names and images.
  The images come from a different url. */
  const searchPokemon = async (id) => {
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
      console.log(evolutionResults);
      if (data.chain.evolves_to[0].evolves_to.length !== 0) {
        let nameEvo3 = data.chain.evolves_to[0].evolves_to[0].species.name;
        let imageEvo3 = await getPokemonImage(nameEvo3);
        evolutionResults.push([nameEvo3, imageEvo3]);
        console.log(evolutionResults);
      }
    }
    setEvoResults(evolutionResults);
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
      <Button
        className=""
        icon={<RxThickArrowLeft />}
        clickHandler={showPreviousPkmn}
      />
      {evoResults.map((pkmn) => (
        <EvoCard
          key={`pkmn-${pkmn[0]}`}
          cardTitle={pkmn[0]}
          cardImage={pkmn[1]}
        />
      ))}
      <Button
        className=""
        icon={<RxThickArrowRight />}
        clickHandler={showNextPkmn}
      />
    </>
  );
};

export default Evocards;
