const Button = ({ icon, clickHandler }) => {
  return (
    <div className="w-[full] ml-4 mr-4">
      <button
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl rounded-full bg-rose-700 hover:bg-rose-500 text-white font-bold p-2 border-b-8 border-violet-900 active:translate-y-1 active:border-b-0"
        onClick={clickHandler}
      >
        {icon}
      </button>
    </div>
  );
};

export default Button;
