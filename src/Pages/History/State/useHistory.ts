import { useEffect, useState } from "react";
import { Availability } from "../../../models/Availability.interface";
import { Booking } from "../../../models/Booking.interface";
import { auth } from "../../../Firebase";
import { getUserHistory } from "../../../services/getUserHistory";
import { getOneBooking } from "../../../services/getOneBooking";

export const useHistory = () => {
    const uid = auth.currentUser?.uid;
    const [listBooking, setListBooking] = useState<Booking[]>([]);
    const [listAvailability, setListAvailability] = useState<Availability[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (uid) {
                    const userHistory = await getUserHistory(uid);
                    setListAvailability(userHistory);
                    console.log(userHistory);
                } else {
                    console.log("Invalid user");
                }
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, [uid]);

    useEffect(() => {
        const fetchBookings = async () => {
            await Promise.all(
                listAvailability.map(async (availability) => {
                    try {
                        const booking = await getOneBooking(availability.booking_id);
                        setListBooking((prevList) => [...prevList, booking]);
                    } catch (error) {
                        console.log("Error fetching booking", error);
                    }
                })
            );
        };
        fetchBookings();
    }, [listAvailability]);

    console.log(listBooking);

    return { listBooking, listAvailability };
};
