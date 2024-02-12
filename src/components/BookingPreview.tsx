import { Booking } from "../models/Booking.interface";

export const BookingPreview = (booking: Booking) => {
  return (
    <>
      <div
        className={`bg-gray-900 rounded-lg shadow-lg p-4 w-9/12 animate-fade-up`}
      >
        <div className="flex justify-center">
          <img
            src={booking.images[0]}
            alt={booking.name}
            className="w-full h-80 object-cover mb-4 rounded-lg"
          />
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
