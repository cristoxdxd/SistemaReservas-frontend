import { BookingCard } from "../BookingCard";
import { useBookingContainer } from "./State/useBookingContainer";
import { Booking } from "../../models/Booking.interface";
import { useEffect, useState } from "react";

export interface IBookingContainerProps {
  listBooking: Booking[];
}

export const BookingContainer = ({ listBooking }: IBookingContainerProps) => {
  const { bookingList } = useBookingContainer(listBooking);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (bookingList.length !== 0) {
      setIsLoading(false);
    }
  }, [bookingList]);

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <h1 className="text-2xl text-white">Loading...</h1>
          </div>
        ) : (
          <>
            {bookingList.map((booking) => (
              <BookingCard
                key={booking._id}
                _id={booking._id}
                name={booking.name}
                summary={booking.summary}
                description={booking.description}
                capacity={booking.capacity}
                price={booking.price}
                room_type={booking.room_type}
                bed_type={booking.bed_type}
                minimum_nights={booking.minimum_nights}
                maximum_nights={booking.maximum_nights}
                bedrooms={booking.bedrooms}
                beds={booking.beds}
                bathrooms={booking.bathrooms}
                images={booking.images}
                availability={booking.availability}
                reviews={booking.reviews}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
