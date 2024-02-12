import { useEffect, useState } from "react";
import { Booking } from "../../../models/Booking.interface";

export const useHome = () => {
  const [listBooking, setListBooking] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBooking = async () => {
      const response = await fetch("/api/");
      const data = await response.json();

      const bookings = data.data.map(
        (booking: Booking & { availability: any; reviews: any }) => {
          return { ...booking };
        }
      );
      setListBooking(bookings);
    };
    fetchBooking();
  }, []);

  return { listBooking };
};
