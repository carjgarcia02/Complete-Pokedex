// Navigation links
import { NavLink } from "react-router-dom";
// Navigation images
import Pokedex from "../images/pokedex.svg";
import Logo from "../images/latios-latias.png";
import Evolutions from "../images/evolutions.png";

const Navigation = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] flex items-center justify-around py-6 select-none">
      <NavLink
        className="flex w-1/4 text-center justify-center items-center sm:scale-110 lg:scale-125 transition duration-200"
        style={({ isActive }) => ({
          transform: isActive ? "scale(1.25)" : "scale(1.0)",
        })}
        to="/pokedex"
      >
        <img className="h-10" src={Pokedex} alt="Pokedex logo" />
      </NavLink>

      <div>
        <img className="h-24 w-full" src={Logo} alt="Nav main logo" />
      </div>

      <NavLink
        className="flex w-1/4 text-center justify-center items-center sm:scale-110 lg:scale-125 transition duration-200"
        style={({ isActive }) => ({
          transform: isActive ? "scale(1.25)" : "scale(1.0)",
        })}
        to="/evolutions"
      >
        <img className="h-14" src={Evolutions} alt="Evolutions logo" />
      </NavLink>
    </nav>
  );
};

export default Navigation;
