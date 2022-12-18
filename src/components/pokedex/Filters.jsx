import React from "react";
import { usePokedexContext } from "../../context/GlobalDataProvider";

const Filters = ({ typeName, background, onChange, checked }) => {
  return (
    <div
      className="inline-block px-2 py-1 rounded-md"
      style={{ backgroundColor: `${background}` }}
    >
      <input
        type="checkbox"
        name="poke-types"
        id={typeName}
        value={typeName}
        onChange={onChange}
        checked={checked}
      />
      <label
        className="text-white text-xs sm:text-sm md:text-base lg:text-lg"
        htmlFor={typeName}
      >
        {" "}
        {typeName}
      </label>
    </div>
  );
};

export default Filters;
