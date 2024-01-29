import { useEffect, useState } from 'react';
import { Booking } from '../../../models/Booking.interface';

export const useBookingContainer = (listBooking: Booking[]) => {
    const [bookingList, setBooking] = useState<Booking[]>([]);

    useEffect(() => {
        if (JSON.stringify(listBooking) !== JSON.stringify(bookingList)) {
            setBooking(listBooking);
        }
    }, [listBooking, bookingList]);

    return { bookingList };
}
