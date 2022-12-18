import { usePokedexContext } from "../../context/GlobalDataProvider";

const PokemonInfo = ({}) => {
  const { modalVisibility, toggleModal } = usePokedexContext();

  return (
    <div
      className={
        "w-full h-screen flex items-center justify-center fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10"
      }
      style={{ visibility: `${modalVisibility}` }}
    >
      <div className="bg-white w-2/4 min-w-[400px] min-h-[500px] p-16 rounded-xl relative">
        <button
          className="rounded-full absolute top-3 right-3"
          onClick={toggleModal}
        >
          X
        </button>
        <p>POKEMON ARE AWESOME CREATURES!</p>
      </div>
    </div>
  );
};

export default PokemonInfo;
