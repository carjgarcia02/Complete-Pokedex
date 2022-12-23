import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePokedexContext } from "../../context/PokedexProvider";
import { AiOutlineClose } from "react-icons/ai";
import DetailsBg from "../../images/detailsBg.png";

const Details = () => {
  const { pkmnSelected, setPkmnSelected, colors } = usePokedexContext();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, [pkmnSelected]);

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
      let fixedAbility = formatAbility(element.ability.name);
      abilities.push(fixedAbility);
    });
    return abilities;
  };

  const formatAbility = (ability) => {
    /* Removes dashes and capitalizes ability names */
    let ability_words = ability.replaceAll("-", " ").split(" ");
    let upper_words = [];
    for (let word of ability_words) {
      upper_words.push(word[0].toUpperCase() + word.substring(1).toLowerCase());
    }
    const formattedAbility = upper_words.join(" ");
    return formattedAbility;
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
    const pkmnUrl = `https://pokeapi.co/api/v2/pokemon/${pkmnSelected}`;
    const response = await fetch(pkmnUrl);
    const pkmnData = await response.json();
    let altName = pkmnData.species.name;
    {
      /* Second fetch with Pokémon description */
    }
    const descUrl = `https://pokeapi.co/api/v2/pokemon-species/${altName}`;
    const responseDesc = await fetch(descUrl);
    const descData = await responseDesc.json();
    const descObject = descData.flavor_text_entries.find(
      (desc) => desc.language.name === "en"
    );
    const description = descObject.flavor_text.replace("", " ");
    /* Descriptions may vary their position inside the API. We used the find method to avoid unexpected languages */

    let pkmnInfo = [
      pkmnData.id,
      pkmnData.name,
      findTypes(pkmnData.types),
      pkmnData.height,
      pkmnData.weight,
      description,
      pkmnData.sprites.other["official-artwork"].front_default,
      findAbilities(pkmnData.abilities),
      findStats(pkmnData.stats),
    ];
    setDetails(pkmnInfo);
  };

  return (
    <article
      className="relative w-full h-full flex-col justify-center items-center font-Play select-none"
      style={{ backgroundImage: `url(${DetailsBg})` }}
    >
      {/* Header */}
      <header className="flex h-1/6 justify-center items-center md:text-lg lg:text-xl xl:text-2xl py-12">
        <h1 className="text-center text-white font-bold">POKÉMON DETAILS</h1>
        <NavLink title="Go Back to Pokédex" to="/pokedex">
          <button className="absolute top-8 right-8 border-2 rounded-full p-1 bg-red-600 hover:bg-green-600">
            {<AiOutlineClose className="text-white" />}
          </button>
        </NavLink>
      </header>
      {/* Pokémon Details */}
      <main className="w-full flex flex-col justify-between items-center p-4 sm:px-10">
        {/* Basic data and Bio */}
        <section className="w-full flex flex-col justify-between items-center text-xs gap-4 lg:gap-8 xl:gap-12">
          {/* Basic information */}
          <div className="min-w-[200px] 2xl:w-1/6 sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-white border-2 rounded-xl overflow-hidden">
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
          <div className="w-[70%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-white border-2 rounded-xl overflow-hidden">
            <h2 className="font-bold text-center text-white bg-amber-900">
              Description:
            </h2>
            <div className="px-2 py-1">
              <p className="text-justify">{details[5] ? details[5] : "N/A"}</p>
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
          <div className="min-w-[200px] 2xl:w-1/6 sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-white border-2 rounded-xl overflow-hidden">
            <h2 className="font-bold text-center text-white bg-rose-600">
              Abilities:
            </h2>
            <div className="text-center px-2 py-1">
              {details[7]?.map((ability) => (
                <p key={`ability-${ability}`}>
                  {ability[0].toUpperCase() + ability.substring(1)}
                </p>
              ))}
            </div>
          </div>

          <div className="w-full sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] sm:text-base md:text-lg lg:text-xl xl:text-2xl border-2 rounded-xl overflow-hidden">
            <h2 className="font-bold text-center text-white bg-indigo-600">
              Stats:
            </h2>
            <div className="px-2 py-1 bg-white">
              {details[8]?.map((stat) => (
                <div
                  key={stat[0]}
                  className="flex justify-between items-center"
                >
                  <div className="w-3/12">
                    <p className="font-bold text-[9px] sm:text-[14px] lg:text-[16px]">
                      {stat[0].toUpperCase().replace("-", " ")}
                    </p>
                  </div>
                  <div className="w-7/12">
                    <div
                      className="h-2 sm:h-3 lg:h-4 bg-green-600"
                      style={{
                        width:
                          stat[1] >= 150 ? "100%" : `${(stat[1] * 100) / 150}%`,
                      }}
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
