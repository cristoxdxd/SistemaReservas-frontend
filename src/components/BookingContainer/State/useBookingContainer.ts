import { useEffect, useMemo, useState } from 'react';
import { Booking } from '../../../models/Booking.interface';

export const useBookingContainer = (listBooking: Booking[]) => {
    const [bookingList, setBooking] = useState<Booking[]>(listBooking);
    const [filter, setFilter] = useState<string>('');

    const filteredList = useMemo(() => {
        if (!filter) {
            return bookingList;
        }
        return bookingList.filter((booking) => {
            const nameMatch = booking.name.toLowerCase().includes(filter.toLowerCase());
            // Add more conditions for filtering if needed
            return nameMatch;
        });
    }, [bookingList, filter]);

    useEffect(() => {
        if (filteredList) {
            setBooking(filteredList);
        }
    }, [filter, filteredList]);

    return { bookingList, setFilter };
}