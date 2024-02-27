import { Booking } from "../models/Booking.interface";

export async function updateBookingDates(id: string, booking: Booking) {
    const response = await fetch(`/api/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...booking}),
    });

    const data = await response.json();
    console.log(data);
    return data;
}