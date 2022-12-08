const Button = ({ icon, clickHandler }) => {
  return (
    <button className="rounded-full" onClick={clickHandler}>
      {icon}
    </button>
  );
};

export default Button;
