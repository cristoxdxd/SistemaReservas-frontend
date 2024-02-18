import { useEffect, useState } from "react";
import { Availability } from "../../models/Availability.interface";
import { Booking } from "../../models/Booking.interface";
import { useHistoryContainer } from "./State/useHistoryContainer";
import { HistoryCard } from "../HistoryCard";

export interface IContainerProps {
  listBooking: Booking[];
  listAvailability: Availability[];
}

export const HistoryContainer = ({
  listBooking,
  listAvailability,
}: IContainerProps) => {
  const { bookingList, availabilityList } = useHistoryContainer(
    listBooking,
    listAvailability
  );
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
            <h1 className="text-2xl text-white animate-pulse">Cargando...</h1>
          </div>
        ) : (
          <>
            {availabilityList.map((availability) => {
              const booking = bookingList.find(
                (booking) => booking._id === availability.booking_id
              );
              if (!booking) return null;
              return (
                <HistoryCard booking={booking} availability={availability} />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
