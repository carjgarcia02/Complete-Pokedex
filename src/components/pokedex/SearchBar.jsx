//Icons
import { BiSearch } from "react-icons/bi";

const Searchbar = ({ value, onChange }) => {
  return (
    <div className="flex m-auto justify-center">
      <input
        type="text"
        className="border-2 text-sm sm:text-lg px-2 py-1 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        placeholder="Find pokémon by name or id"
        value={value}
        onChange={onChange}
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-xl p-2 rounded-md"
      >
        <BiSearch />
      </button>
    </div>
  );
};

export default Searchbar;
