import { BookingCard } from '../BookingCard';
import { useBookingContainer } from './State/useBookingContainer';
import { Booking } from '../../models/Booking.interface';

export interface IBookingContainerProps {
    listBooking: Booking[];
}

export const BookingContainer = ({ listBooking }: IBookingContainerProps) => {
    const { bookingList } = useBookingContainer(listBooking);

    return(
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                {bookingList.length !== 0 ?(
                    <>
                    {bookingList.map((booking) => (
                        <BookingCard 
                            id={booking.id}
                            name={booking.name}  
                            description={booking.description}
                            price={booking.price}
                            capacity={booking.capacity}
                            image={booking.image}
                        />
                    ))}
                    </>
                ):(
                    <div className="flex justify-center items-center">
                        <h1 className="text-2xl text-gray-600">No hay reservas</h1>
                    </div>
                )}
            </div>
        </div>
    )
}