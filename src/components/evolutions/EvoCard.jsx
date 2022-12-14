const PokeCard = ({ cardTitle, cardImage }) => {
  return (
    <article
      className="flex justify-center items-center w-[130px] h-[180px] sm:w-[160px] sm:h-[230px] md:w-[200px] md:h-[280px] lg:w-[240px] lg:h-[320px] mt-4 mb-4 sm:p-4 md:p-8 border-2 rounded-xl shadow-lg overflow-hidden relative transition sm:hover:-translate-y-4"
      style={{
        background:
          "linear-gradient(-10deg,#d9edf7 35%,rgba(237,202,216,0) 75%,#ffd7e0),radial-gradient(circle,#ffcae1 0,#daeafc 100%)",
      }}
    >
      <div className="bg-pink-700 rounded-bl-xl rounded-tl-xl font-bold absolute top-0 right-0 px-2">
        <p className="text-white text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] font-Play">
          {cardTitle}
        </p>
      </div>
      <img className="w-[70%] sm:w-[85%] md:w-full" src={cardImage} alt="" />
    </article>
  );
};

export default PokeCard;
