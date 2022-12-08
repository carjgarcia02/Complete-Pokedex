const PokeCard = ({ cardTitle, cardImage }) => {
  return (
    <div>
      <div className="font-semibold">
        <h2>{cardTitle}</h2>
        <img src={cardImage} alt="" />
      </div>
    </div>
  );
};

export default PokeCard;
