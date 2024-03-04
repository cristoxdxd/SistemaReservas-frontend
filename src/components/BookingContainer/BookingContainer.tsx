import { BookingCard } from "../BookingCard";
import { useBookingContainer } from "./State/useBookingContainer";
import { Booking } from "../../models/Booking.interface";
import { useEffect, useState } from "react";

export interface IBookingContainerProps {
  listBooking: Booking[];
  numAdults: number;
  numChildren: number;
  numBabies: number;
  childAges: number[];
  totalCapacity: number;
  minPrice: number;
  maxPrice: number;
}

export const BookingContainer = ({ listBooking, numAdults, numChildren, numBabies, childAges, totalCapacity, minPrice, maxPrice }: IBookingContainerProps) => {
  const { bookingList } = useBookingContainer(listBooking);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (bookingList.length !== 0) {
      setIsLoading(false);
      filterBookings();
    }
  }, [bookingList, totalCapacity, minPrice, maxPrice]);

  const filterBookings = () => {
    const filtered = bookingList.filter((booking) => {
      return booking.capacity >= totalCapacity && booking.price >= minPrice && booking.price <= maxPrice;
    });
    setFilteredBookings(filtered);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <h1 className="text-2xl text-white">Cargando...</h1>
          </div>
        ) : (
          <>
            {filteredBookings.map((booking) => (
              <BookingCard
                booking={booking}
                numAdults={numAdults}
                numChildren={numChildren}
                numBabies={numBabies}
                childAges={childAges}
                totalCapacity={totalCapacity}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
