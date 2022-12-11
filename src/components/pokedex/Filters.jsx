import React from "react";

const Filters = ({ typeName, background }) => {
  return (
    <div
      className="inline-block px-2 py-1 rounded-md"
      style={{ backgroundColor: `${background}` }}
    >
      <input type="checkbox" id={typeName} />
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
