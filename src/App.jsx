//Components
import Navigation from "./components/Navigation";
import Pokedex from "./components/pokedex/Pokedex";
import Evolutions from "./components/evolutions/Evolutions";
import PokemonInfo from "./components/pokedex/PokemonInfo";

//Routing
import { Navigate, Routes, Route } from "react-router-dom";

//Contexts
import { PokedexProvider } from "./context/PokedexProvider";
import { EvolutionsProvider } from "./context/EvolutionsProvider";

const App = () => {
  return (
    <PokedexProvider>
      <EvolutionsProvider>
        <PokemonInfo />
        <Navigation />
        <main className="flex">
          <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/evolutions" element={<Evolutions />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </EvolutionsProvider>
    </PokedexProvider>
  );
};

export default App;
