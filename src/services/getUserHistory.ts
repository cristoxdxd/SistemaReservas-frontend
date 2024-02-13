import { Availability } from "../models/Availability.interface";

export async function getUserHistory(user: string) {
    const response = await fetch(`/api/availability/${user}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    const history: Availability[] = data.data;
    return history;
}