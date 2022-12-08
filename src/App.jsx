//Components
import Navigation from "./components/Navigation";
import Pokedex from "./components/pokedex/Pokedex";
import Evolutions from "./components/evolutions/Evolutions";
import Footer from "./components/Footer";

//Routing
import { Navigate, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navigation />
      <main className="flex">
        <Routes>
          <Route path="/" element={<Evolutions />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/evocards" element={<Evolutions />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
