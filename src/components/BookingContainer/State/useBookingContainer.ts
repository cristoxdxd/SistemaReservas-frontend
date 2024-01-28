import { useEffect, useState } from 'react';
import { Booking } from '../../../models/Booking.interface';

export const useBookingContainer = (listBooking: Booking[]) => {
    const [bookingList, setBooking] = useState<Booking[]>([]);

    useEffect(() => {
        setBooking(listBooking);
    }, [listBooking]);

    return { bookingList }
}