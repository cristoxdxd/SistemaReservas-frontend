import { AvailabilityInput } from "../models/Availability.interface";

export async function updateAvailability(id: string, availability: AvailabilityInput) {
    const response = await fetch(`/api/availability/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...availability}),
    });

    const data = await response.json();
    console.log(data);
    return data;
}