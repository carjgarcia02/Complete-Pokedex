const Button = ({ icon, clickHandler }) => {
  return (
    <div className="w-[full] ml-4 mr-4">
      <button
        className="text-2xl sm:text-3xl md:text-4xl rounded-full bg-fuchsia-800 hover:bg-fuchsia-600 text-white font-bold p-2 border-b-4 border-blue-700 hover:border-blue-500 active:translate-y-1 active:border-b-0"
        onClick={clickHandler}
      >
        {icon}
      </button>
    </div>
  );
};

export default Button;
