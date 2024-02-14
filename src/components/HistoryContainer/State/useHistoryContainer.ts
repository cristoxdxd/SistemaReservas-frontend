import { useEffect, useState } from "react";
import { Availability } from "../../../models/Availability.interface";
import { Booking } from "../../../models/Booking.interface";

export const useHistoryContainer = (listBooking: Booking[], listAvailability: Availability[]) => {
    const [bookingList, setBooking] = useState<Booking[]>(listBooking);
    const [availabilityList, setAvailability] = useState<Availability[]>(listAvailability);

    useEffect(() => {
        if (listBooking && listAvailability) {
            setBooking(listBooking);
            setAvailability(listAvailability);
        }
    });

    return { bookingList, availabilityList };
}