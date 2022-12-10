import { useState, useEffect } from "react";
import Rainbow from "../../images/rainbow-bg.gif";

const PokemonCard = ({ id, name, image, typesArray }) => {
  const [showShiny, setShowShiny] = useState(false);

  const handleShiny = () => {
    setShowShiny(!showShiny);
  };

  const colors = {
    NORMAL: "#bbbbb0",
    GRASS: "#89d750",
    FIRE: "#fb5441",
    WATER: "#59abf9",
    FIGHTING: "#a55746",
    FLYING: "#7a9ef5",
    POISON: "#965891",
    GROUND: "#dba561",
    ROCK: "#cebe73",
    BUG: "#c1d020",
    GHOST: "#7770ce",
    ELECTRIC: "#f8d407",
    PSYCHIC: "#fb64b4",
    ICE: "#95f1fe",
    DRAGON: "#8975f2",
    DARK: "#8c6753",
    STEEL: "#c4c2da",
    FAIRY: "#f8adff",
  };

  return (
    <article
      className={`flex flex-col justify-center items-center bg-slate-800 w-[130px] h-[180px] sm:w-[160px] sm:h-[230px] md:w-[200px] md:h-[280px] lg:w-[240px] lg:h-[320px] mt-4 mb-4 sm:p-4 md:p-8 font-Play font-bold text-white border-8 rounded-xl shadow-lg relative transition sm:hover:-translate-y-4`}
      style={{ borderColor: colors[`${typesArray[0]}`] }}
    >
      {/* Pokémon ID */}
      <div className="flex justify-center items-center h-6 md:h-8 md:w-18 text-xs sm:text-xs md:text-base absolute top-0 md:top-1 left-2">
        <h4>{`No. ${id}`}</h4>
      </div>
      {/* Shiny Button */}
      <img
        className="h-4 w-4 md:h-8 md:w-8 border-2 border-white rounded-full hover:cursor-pointer absolute top-1 right-1"
        src={Rainbow}
        onClick={handleShiny}
        title="Make me SHINY!"
        alt="Shiny Button Background"
      />

      {/* Pokemon Name and Image */}
      <div className="flex flex-col text-center justify-center items-center -mt-7">
        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg">{name}</h3>

        <img
          className="w-[70%] sm:w-[85%] md:w-full"
          src={image[Number(showShiny)]}
          alt=""
        />
      </div>

      {/* Pokemon Types */}
      <div className="w-full flex justify-center text-[7px] sm:text-[10px] md:text-xs gap-3 absolute bottom-4">
        <div
          className="px-2 py-1 border-2 border-white"
          style={{ backgroundColor: colors[`${typesArray[0]}`] }}
        >
          {typesArray[0]}
        </div>
        <div
          className={
            typesArray.length > 1 ? "px-2 py-1 border-2 border-white" : "hidden"
          }
          style={{ backgroundColor: colors[`${typesArray[1]}`] }}
        >
          {typesArray[1]}
        </div>
      </div>
    </article>
  );
};

export default PokemonCard;
