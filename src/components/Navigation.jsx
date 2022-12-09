import { NavLink } from "react-router-dom";
import Pokedex from "../images/pokedex.svg";
import Logo from "../images/logo.jpg";
import Evolutions from "../images/evolutions.png";

const Navigation = () => {
  return (
    <nav>
      <div className="flex justify-around py-6 border-b-2 shadow-lg select-none">
        <NavLink
          className="flex w-1/4 text-center justify-center items-center"
          to="/pokedex"
        >
          <img className="h-10" src={Pokedex} alt="" />
        </NavLink>
        <div>
          <img className="h-20 w-full" src={Logo} alt="Nav Main Logo" />
        </div>
        <NavLink
          className="flex w-1/4 text-center justify-center items-center"
          to="/evolutions"
        >
          <img className="h-14" src={Evolutions} alt="" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
