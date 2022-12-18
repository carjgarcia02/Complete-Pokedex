//Components
import Navigation from "./components/Navigation";
import Pokedex from "./components/pokedex/Pokedex";
import Evolutions from "./components/evolutions/Evolutions";
import PokemonInfo from "./components/pokedex/PokemonInfo";
import Footer from "./components/Footer";

//Routing
import { Navigate, Routes, Route } from "react-router-dom";

//Context that stores ALL the variables and functions of this app
import { GlobalDataProvider } from "./context/GlobalDataProvider";

const App = () => {
  return (
    <GlobalDataProvider>
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
    </GlobalDataProvider>
  );
};

export default App;
