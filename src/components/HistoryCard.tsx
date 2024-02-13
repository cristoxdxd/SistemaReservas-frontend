import { Booking } from "../models/Booking.interface";
import { Availability } from "../models/Availability.interface";

interface HistoryCardProps {
  booking: Booking;
  availability: Availability;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  booking,
  availability,
}) => {
  const startDate = new Date(availability.start_date);
  const endDate = new Date(availability.end_date);

  const dateRange = endDate.getTime() - startDate.getTime();
  const days = dateRange / (1000 * 60 * 60 * 24);

  const total = days * booking.price;

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
        {/* <p className="text-blue-400 mb-2">{booking.description}</p> */}
        <p className="text-blue-400 mb-2">Precio: ${booking.price} /noche</p>
        <p className="text-blue-400 mb-2">Precio Total: ${total}</p>
        <p className="text-blue-400 mb-2">Capacidad: {booking.capacity}</p>
        <p className="text-blue-400 mb-2">Camas: {booking.beds}</p>
        <p className="text-blue-400 mb-2">Baños: {booking.bathrooms}</p>
        <div className="flex items-center justify-center">
          <p className="text-blue-400 mb-2">
            {availability.start_date}|{availability.end_date}
          </p>
        </div>
      </div>
    </>
  );
};
