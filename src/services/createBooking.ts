import { AvailabilityInput } from "../models/Availability.interface";

export async function createBooking(availability: AvailabilityInput) {
  const response = await fetch("/api/availability/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...availability }),
  });

  const data = await response.json();
  console.log(data);
  return data;
}
