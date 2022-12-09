const PokeCard = ({ cardTitle, cardImage }) => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 w-[130px] h-[180px] sm:w-[160px] sm:h-[230px] md:w-[200px] md:h-[280px] lg:w-[240px] lg:h-[320px] mt-4 mb-4 sm:p-4 md:p-8 border-2 rounded-xl shadow-lg overflow-hidden relative transition sm:hover:-translate-y-4">
      <div className="bg-gradient-to-r from-[#c31432] to-[#240b36] font-bold absolute top-0 right-0 px-2">
        <p className="text-white text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] font-sans">
          {cardTitle}
        </p>
      </div>
      <img className="w-[70%] sm:w-[85%] md:w-full" src={cardImage} alt="" />
    </div>
  );
};

export default PokeCard;
