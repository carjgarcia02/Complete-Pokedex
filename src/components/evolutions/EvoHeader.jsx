import { useEvolutionsContext } from "../../context/EvolutionsProvider";

const EvoHeader = () => {
  const { evoChainId } = useEvolutionsContext();

  return (
    <header className="text-center">
      <h2 className="font-bold mb-5 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        This is the Pokémon Evolutions Page
      </h2>
      <p>Scroll through evolution lines using side buttons.</p>
      <p>
        <span className="font-bold">Side note:</span> please keep in mind that
        some ids, e.g. 251, won't render anything. That's how the API works.
      </p>
      <p className="text-neutral-800 mt-6">
        Showing Evolution Chain{" "}
        <span className="font-bold text-violet-700 text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          # {evoChainId}
        </span>
      </p>
    </header>
  );
};

export default EvoHeader;
