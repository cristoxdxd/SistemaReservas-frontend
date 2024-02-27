export interface Booking {
    _id: string;
    name: string;
    summary: string;
    description: string;
    capacity: number;
    price: number;
    room_type: string;
    bed_type: string;
    minimum_nights: number;
    maximum_nights: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    images: string[];
    availability?: string[];
    reviews?: string[];
}