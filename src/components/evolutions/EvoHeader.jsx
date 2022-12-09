const EvoHeader = () => {
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
    </header>
  );
};

export default EvoHeader;
