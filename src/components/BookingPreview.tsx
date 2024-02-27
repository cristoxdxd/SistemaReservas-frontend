import { Booking } from "../models/Booking.interface";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

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
        className={`bg-gray-900 rounded-lg shadow-lg p-4 w-9/12 animate-fade-up`}
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
        <h2 className="text-white text-4xl font-bold mb-2">{booking.name}</h2>
        <p className="text-blue-400 mb-2">{booking.description}</p>
        <p className="text-blue-400 mb-2">Precio: {booking.price}</p>
        <p className="text-blue-400 mb-2">Capacidad: {booking.capacity}</p>
        <p className="text-blue-400 mb-2">Camas: {booking.beds}</p>
        <p className="text-blue-400 mb-2">Baños: {booking.bathrooms}</p>
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