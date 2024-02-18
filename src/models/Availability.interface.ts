export interface Availability {
    _id: string;
    booking_id: string;
    start_date: string;
    end_date: string;
    user: string;
}

export interface AvailabilityInput {
    booking_id: string;
    start_date: string;
    end_date: string;
    user: string;
}
