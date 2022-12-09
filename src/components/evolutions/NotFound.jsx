import NotFoundImg from "../../images/notFound.jpg";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center w-[130px] h-[180px] sm:w-[160px] sm:h-[230px] md:w-[200px] md:h-[280px] lg:w-[240px] lg:h-[320px] mt-4 mb-4 border-2 rounded-xl shadow-lg transition hover:-translate-y-4">
      <img className="h-full" src={NotFoundImg} alt="Psyduck Not Found" />
    </div>
  );
};

export default NotFound;
