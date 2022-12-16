import React from "react";

const Filters = ({ typeName, background, onChange }) => {
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
