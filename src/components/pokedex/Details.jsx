import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePokedexContext } from "../../context/PokedexProvider";
import { AiOutlineClose } from "react-icons/ai";

const Details = () => {
  const { idSelected, setIdSelected, colors } = usePokedexContext();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, [idSelected]);

  /* The next 3 functions find and organize some info to be used in the modal */
  const findTypes = (data) => {
    let types = [];
    data.forEach((element) => {
      types.push(element.type.name);
    });
    return types;
  };

  const findAbilities = (data) => {
    let abilities = [];
    data.forEach((element) => {
      abilities.push(element.ability.name);
    });
    return abilities;
  };

  const findStats = (data) => {
    let stats = [];
    data.forEach((element) => {
      stats.push([element.stat.name, element.base_stat]);
    });
    return stats;
  };

  /* And finally, modal info is set into the state whenever clicking a Pokémon's img */
  const fetchDetails = async () => {
    const pkmnUrl = `https://pokeapi.co/api/v2/pokemon/${idSelected}`;
    const response = await fetch(pkmnUrl);
    const pkmnData = await response.json();

    {
      /* Second fetch with Pokémon description */
    }
    const descUrl = `https://pokeapi.co/api/v2/pokemon-species/${idSelected}`;
    const responseDesc = await fetch(descUrl);
    const descData = await responseDesc.json();

    let pkmnInfo = [
      pkmnData.id,
      pkmnData.name,
      findTypes(pkmnData.types),
      pkmnData.height,
      pkmnData.weight,
      descData.flavor_text_entries[2].flavor_text,
      pkmnData.sprites.other["official-artwork"].front_default,
      findAbilities(pkmnData.abilities),
      findStats(pkmnData.stats),
    ];
    setDetails(pkmnInfo);
  };

  return (
    <article className="relative w-full h-screen flex-col justify-center items-center font-Play select-none">
      {/* Header */}
      <header className="flex h-1/6 justify-center items-center md:text-lg lg:text-xl xl:text-2xl">
        <h1 className="text-center font-bold">POKÉMON DETAILS</h1>
        <NavLink title="Go Back to Pokédex" to="/pokedex">
          <button className="absolute top-8 right-8 border-2 rounded-full p-2 bg-red-600 hover:bg-green-600">
            {<AiOutlineClose className="text-white" />}
          </button>
        </NavLink>
      </header>
      {/* Pokémon Details */}
      <main className="w-full flex flex-col justify-between items-center px-4 sm:px-10">
        {/* Basic data and Bio */}
        <section className="w-full flex flex-col justify-between items-center text-xs gap-4 lg:gap-8 xl:gap-12">
          {/* Basic information */}
          <div className="w-auto sm:text-base md:text-lg lg:text-xl xl:text-2xl border-2 rounded-xl overflow-hidden">
            <h2 className="font-bold text-center bg-teal-600 text-white">
              Basic data:
            </h2>
            <div className="px-2 py-1">
              <p>
                <span className="font-bold">No.</span> {details[0]}
              </p>
              <p>
                <span className="font-bold">Name:</span>{" "}
                {details[1]
                  ? details[1][0].toUpperCase() +
                    details[1].substring(1).toLowerCase()
                  : ""}
              </p>
              <div className="flex items-center">
                <p className="font-bold">Type: </p>
                <div className="flex ml-2 gap-1">
                  {details[2]?.map((type) => (
                    <div
                      key={`type-${type}`}
                      className="flex justify-center items-center rounded-sm px-2 text-white font-bold"
                      style={{ backgroundColor: colors[type.toUpperCase()] }}
                    >
                      <p>
                        {type[0].toUpperCase() +
                          type.substring(1).toLowerCase()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <p>
                <span className="font-bold">Height:</span> {details[3]}
              </p>
              <p>
                <span className="font-bold">Weight:</span> {details[4]}
              </p>
            </div>
          </div>
          {/* Pokémon Description */}
          <div className="sm:text-base md:text-lg lg:text-xl xl:text-2xl md:w-4/5 lg:w-3/5 border-2 rounded-xl overflow-hidden">
            <h2 className="font-bold text-center text-white bg-amber-900">
              Description:
            </h2>
            <div className="px-2 py-1">
              <p className="text-justify">
                {details[5] ? details[5].replace("", " ") : "N/A"}
              </p>
            </div>
          </div>
        </section>

        {/* Image */}
        <section className="w-full flex justify-center items-center my-4">
          <img
            className="h-40 w-40 sm:h-52 sm:w-52 md:h-64 md:w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
            src={details[6]}
            alt="Modal image"
          />
        </section>

        {/* Abilities and Stats */}
        <section className="w-full flex flex-col justify-between items-center text-xs gap-4 lg:gap-8 xl:gap-12 mb-4">
          <div className="sm:text-base md:text-lg lg:text-xl xl:text-2xl border-2 rounded-xl overflow-hidden">
            <h2 className="font-bold text-center text-white bg-rose-600">
              Abilities:
            </h2>
            <div className="px-2 py-1">
              {details[7]?.map((ability) => (
                <p key={`ability-${ability}`}>
                  {ability[0].toUpperCase() + ability.substring(1)}
                </p>
              ))}
            </div>
          </div>

          <div className="w-full md:w-4/5 lg:w-3/5 sm:text-base md:text-lg lg:text-xl xl:text-2xl border-2 rounded-xl overflow-hidden">
            <h2 className="font-bold text-center text-white bg-indigo-600">
              Stats:
            </h2>
            <div className="px-2 py-1">
              {details[8]?.map((stat) => (
                <div
                  key={stat[0]}
                  className="flex justify-between items-center"
                >
                  <div className="w-4/12">
                    <p className="font-bold">
                      {stat[0].toUpperCase().replace("-", " ")}
                    </p>
                  </div>
                  <div className="w-7/12">
                    <div
                      className="h-2 sm:h-3 lg:h-4 bg-green-600"
                      style={{ width: stat[1] > 100 ? "100%" : `${stat[1]}%` }}
                    ></div>
                  </div>
                  <div className="w-1/12 text-center">
                    <p>{stat[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </article>
  );
};

export default Details;
