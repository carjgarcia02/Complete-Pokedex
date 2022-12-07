const PokeCard = ({ cardTitle, cardImage }) => {
  return (
    <div>
      <div className="font-semibold">
        {cardTitle}
        {cardImage}
      </div>
    </div>
  )
};

export default PokeCard;
