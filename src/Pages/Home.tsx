import { NavBar } from "../components/NavBar";
import HotelOverview from "../assets/hotel-overview-1.jpg";
import HotelOverview2 from "../assets/hotel-overview-2.jpg";
import HotelOverview3 from "../assets/hotel-overview-3.jpg";
import HotelOverview4 from "../assets/hotel-overview-4.jpg";
import HotelOverview5 from "../assets/hotel-overview-5.jpg";
import HotelOverview6 from "../assets/hotel-overview-6.jpg";
import HotelOverview7 from "../assets/hotel-overview-7.jpg";
import HotelOverview8 from "../assets/hotel-overview-8.jpg";
import { BookingContainer } from "../components/BookingContainer/BookingContainer";
import { useBookingContainer } from "../components/BookingContainer/State/useBookingContainer";
import { Cabania } from "../constants/cabanias";
import { Habitacion } from "../constants/habitaciones";
import { Booking } from "../models/Booking.interface";
import { FiltroBusquedas } from "../components/FiltroBusqueda";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";

const images = [HotelOverview, HotelOverview2, HotelOverview3, HotelOverview4, HotelOverview5, HotelOverview6, HotelOverview7, HotelOverview8];

export const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  
  const { bookingList: cabaniasList }: { bookingList: Booking[] } =
    useBookingContainer(
      Cabania.map((cabania) => ({
        ...cabania,
        price: cabania.price.toString(),
        capacity: cabania.capacity.toString(),
      }))
    );
  const { bookingList: habitacionesList }: { bookingList: Booking[] } =
    useBookingContainer(
      Habitacion.map((habitacion) => ({
        ...habitacion,
        price: habitacion.price.toString(),
        capacity: habitacion.capacity.toString(),
      }))
    );

  return (
    <>
      <NavBar />
      
      <div
        className="py-20 relative animate-fade-down"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70">
            <h2 className="text-3xl font-extrabold tracking-tight text-blue-500 sm:text-4xl">
              Bienvenidos al Hotel Copo de Nieve
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-blue-300 sm:mt-4">
              El mejor hotel para disfrutar de la nieve
            </p>
          </div>
        </div>
        <div className="absolute inset-0 border-2 border-blue-500"></div>
      </div>
      <FiltroBusquedas />
      <br />
      <h1 className="text-center text-3xl font-extrabold text-white sm:text-4xl">
        Cabañas
      </h1>
      <br />
      <BookingContainer listBooking={cabaniasList} />
      <br />
      <br />
      <h1 className="text-center text-3xl font-extrabold text-white sm:text-4xl">
        Habitaciones
      </h1>
      <br />
      <BookingContainer listBooking={habitacionesList} />
      <br />
      <Footer />
    </>
  );
};
