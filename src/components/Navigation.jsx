import { NavLink } from "react-router-dom";
//Navigation images
import Pokedex from "../images/pokedex.svg";
import Logo from "../images/logo.jpg";
import Evolutions from "../images/evolutions.png";

const Navigation = () => {
  return (
    <nav className="w-full flex justify-around py-6 border-b-2 shadow-lg select-none">
      <NavLink
        className="flex w-1/4 text-center justify-center items-center scale-150 hover:scale-150 transition duration-300"
        style={({ isActive }) => ({
          transform: isActive ? "scale(1.50)" : "scale(1.0)",
        })}
        to="/pokedex"
      >
        <img className="h-10" src={Pokedex} alt="" />
      </NavLink>

      <div>
        <img className="h-20 w-full" src={Logo} alt="Nav Main Logo" />
      </div>
      <NavLink
        className="flex w-1/4 text-center justify-center items-center hover:scale-150 transition duration-300"
        style={({ isActive }) => ({
          transform: isActive ? "scale(1.50)" : "scale(1.0)",
        })}
        to="/evolutions"
      >
        <img className="h-14" src={Evolutions} alt="" />
      </NavLink>
    </nav>
  );
};

export default Navigation;
