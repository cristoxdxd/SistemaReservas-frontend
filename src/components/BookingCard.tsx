import { useState } from "react";
import { Link } from "react-router-dom";

export const BookingCard = ({
  id,
  name,
  description,
  price,
  capacity,
  image,
}: {
  id: string;
  name: string;
  description: string;
  price: string;
  capacity: string;
  image: string;
}) => {
  const queryParams = `?id=${encodeURIComponent(id)}`;
  const [isAnimating, setIsAnimating] = useState(false);

  const handleReservarClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };
  return (
    <div
      className={`bg-gray-900 rounded-lg shadow-lg p-4 sm:max-w-xs sm:min-w-xs md:max-w-sm md:min-w-sm lg:max-w-md lg:min-w-md xl:max-w-lg xl:min-w-lg card w-80 sm:w-72 animate-fade-up`}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover mb-4 rounded-lg"
      />
      <h2 className="text-white text-xl font-bold mb-2">{name}</h2>
      <p className="text-blue-400 mb-2">{description}</p>
      <p className="text-blue-400 mb-2">Price: {price}</p>
      <p className="text-blue-400 mb-2">Capacity: {capacity}</p>
      <Link to={`/reservepage${queryParams}`}>
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isAnimating ? "animate-jump" : ""
          }`}
          onClick={handleReservarClick}
        >
          Reservar
        </button>
      </Link>
    </div>
  );
};
