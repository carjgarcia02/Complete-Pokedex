import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <div>Pokemon Logo</div>
      <div>
        <NavLink to="/pokedex">Pokédex</NavLink>
        <NavLink to="/evocards">Evolutions</NavLink>
      </div>
    </div>
  );
};

export default Navigation;
