//Components
import EvoHeader from "./EvoHeader";
import EvoCard from "./EvoCard";
import NotFound from "./NotFound";
import Button from "./Button";
//Images
import Pokeball from "../../images/pokeball.png";
//React-icons
import { RxThickArrowLeft } from "react-icons/rx";
import { RxThickArrowRight } from "react-icons/rx";
//Hooks
import { useEvolutionsContext } from "../../context/EvolutionsProvider";
//Context

const Evolutions = () => {
  const {
    evoChainId,
    evoResults,
    error,
    showPreviousPkmn,
    showNextPkmn,
    handleChange,
  } = useEvolutionsContext();

  return (
    <>
      <div className="flex flex-col w-full h-full sm:h-screen justify-between items-center mt-6 mb-6 p-6 bg-no-repeat bg-bottom font-Patrick select-none">
        {/* Header message */}
        <EvoHeader />
        <p>
          Showing Evolution Chain{" "}
          <span className="font-bold text-violet-700 text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            # {evoChainId}
          </span>
        </p>

        {/* Main section */}
        <main className="flex w-full justify-center items-center">
          <Button icon={<RxThickArrowLeft />} clickHandler={showPreviousPkmn} />

          <div className="flex flex-col sm:flex-row w-[80%] justify-center items-center gap-3 xl:gap-12">
            {error === false ? (
              evoResults.map((evo) => (
                <EvoCard
                  key={`evo-${evo[0]}`}
                  cardTitle={evo[0]}
                  cardImage={evo[1]}
                />
              ))
            ) : (
              <NotFound />
            )}
          </div>

          <Button icon={<RxThickArrowRight />} clickHandler={showNextPkmn} />
        </main>

        {/* Search Bar */}
        <div className="flex items-center border-4 gap-6 p-4">
          <div>
            <p className="flex flex-col">
              Search using an evo chain id.
              <br />
              Enter a number (1-399).
            </p>
          </div>
          <input
            className="text-center text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold h-20 w-20 border-4 focus:outline-none"
            type="number"
            min="1"
            max="399"
            maxLength={3}
            onChange={handleChange}
          />
          <img className="w-[60px] h-[60px]" src={Pokeball} alt="A Pokéball" />
        </div>
      </div>
    </>
  );
};

export default Evolutions;
