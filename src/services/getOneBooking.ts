import { Booking } from "../models/Booking.interface";

export async function getOneBooking(id: string) {
    const response = await fetch(`/api/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    const booking: Booking = data.data;
    return booking;
}
