import { Booking } from "../models/Booking.interface"

export async function putAvailability(booking: Booking) {
    const response = await fetch("/", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({... booking}),
    });
    
    const data = await response.json();
    return data;
    }