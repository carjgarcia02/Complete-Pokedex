//Hooks
import { useState, useEffect, useContext, createContext } from "react";

const evolutionsContext = createContext();

/* Custom hook that let you use context without importing them */
export function useEvolutionsContext() {
  return useContext(evolutionsContext);
}

export function EvolutionsProvider({ children }) {
  const [evoChainId, setEvoChainId] = useState(1);
  const [evoResults, setEvoResults] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    searchEvolutions(evoChainId);
  }, [evoChainId]);

  /* Functions used to retreive names and images.
  The images come from a different url. */
  const searchEvolutions = async (id) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/evolution-chain/${id}/`
      );
      const data = await response.json();
      //An array filled with the evolution chain from the searched Pokemon.
      let evolutionResults = [];

      let name = data.chain.species.name;
      let image = await getEvolutionImage(name);
      evolutionResults.push([name, image]);

      if (data.chain.evolves_to.length !== 0) {
        let nameEvo2 = data.chain.evolves_to[0].species.name;
        let imageEvo2 = await getEvolutionImage(nameEvo2);
        evolutionResults.push([nameEvo2, imageEvo2]);
        if (data.chain.evolves_to[0].evolves_to.length !== 0) {
          let nameEvo3 = data.chain.evolves_to[0].evolves_to[0].species.name;
          let imageEvo3 = await getEvolutionImage(nameEvo3);
          evolutionResults.push([nameEvo3, imageEvo3]);
        }
      }
      setEvoResults(evolutionResults);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  const getEvolutionImage = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await response.json();
    return data.sprites.other.home.front_default;
  };

  //Button functions
  const showPreviousPkmn = () => {
    evoChainId == 1
      ? setEvoChainId(399)
      : setEvoChainId(Number(evoChainId) - 1);
  };

  const showNextPkmn = () => {
    evoChainId == 399
      ? setEvoChainId(1)
      : setEvoChainId(Number(evoChainId) + 1);
  };

  //Search function
  const handleChange = (e) => {
    if (e.target.value !== null) {
      const limit = 3; //Max length wanted for the number field
      e.target.value = e.target.value.slice(0, limit);
      setEvoChainId(e.target.value.slice(0, limit));
    }
  };

  return (
    <evolutionsContext.Provider
      value={{
        evoChainId,
        evoResults,
        error,
        showPreviousPkmn,
        showNextPkmn,
        handleChange,
      }}
    >
      {children}
    </evolutionsContext.Provider>
  );
}
