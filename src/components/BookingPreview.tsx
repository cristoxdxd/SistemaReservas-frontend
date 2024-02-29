import { Booking } from "../models/Booking.interface";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSackDollar, faUsers, faBed, faBath } from '@fortawesome/free-solid-svg-icons';

export const BookingPreview = (booking: Booking) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === booking.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? booking.images.length - 1 : prevIndex - 1
    );
  };
  return (
    <>
      <div
        className={`px-4  bg-gray-900 rounded-lg shadow-lg p-4 w-7/12 animate-fade-up`}
      >
        <div className="relative">
          {booking.images && booking.images.length > 0 && (
            <>
              <img
                src={booking.images[currentImageIndex]}
                alt={booking.name}
                className="w-full h-80 object-cover mb-4 rounded-lg"
              />
              <button
                onClick={handlePreviousImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white font-bold py-2 px-4 rounded-full"
              >
                <ChevronLeftIcon className="h-10 w-10" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white font-bold py-2 px-4 rounded-full"
              >
                <ChevronRightIcon className="h-10 w-10" />
              </button>
            </>
          )}
        </div>

        <div className="text-white font-semibold">
          <h2 className="text-4xl font-bold mb-2">{booking.name}</h2>
          <p className="text-blue-400 mb-2">{booking.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <p className="flex items-center text-white">
              <FontAwesomeIcon icon={faSackDollar} className="h-8 w-8 mr-2" />
              <span className="font-bold">Precio:&nbsp; </span> ${booking.price} x noche
            </p>
            <p className="flex items-center text-white">
              <FontAwesomeIcon icon={faUsers} className="h-8 w-8 mr-2" />
              <span className="font-bold">Capacidad:&nbsp; </span> {booking.capacity} personas
            </p>
            <p className="flex items-center text-white">
              <FontAwesomeIcon icon={faBed} className="h-8 w-8 mr-2" />
              <span className="font-bold">Camas:&nbsp; </span> {booking.beds}
            </p>
            <p className="flex items-center text-white">
              <FontAwesomeIcon icon={faBath} className="h-8 w-8 mr-2" />
              <span className="font-bold">Baños:&nbsp; </span> {booking.bathrooms}
            </p>
          </div>
        </div>
      </div>
      {/* <br />
      <div className="">
        {booking.reviews &&
          booking.reviews.map((review) => (
            <p className="text-blue-400 mb-2">{review}</p>
          ))}
      </div> */}
    </>
  );
};