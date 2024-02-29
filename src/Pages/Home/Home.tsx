import { useState, useEffect } from "react";
import { NavBar } from "../../components/NavBar";
import { useHome } from "./State/useHome";
import HotelOverview from "../../assets/hotel-overview-1.jpg";
import HotelOverview2 from "../../assets/hotel-overview-2.jpg";
import HotelOverview3 from "../../assets/hotel-overview-3.jpg";
import HotelOverview4 from "../../assets/hotel-overview-4.jpg";
import HotelOverview5 from "../../assets/hotel-overview-5.jpg";
import HotelOverview6 from "../../assets/hotel-overview-6.jpg";
import HotelOverview7 from "../../assets/hotel-overview-7.jpg";
import HotelOverview8 from "../../assets/hotel-overview-8.jpg";
import SnowFlakeLogo from "../../assets/snowflake_nav.svg";
import { FiltroBusquedas } from "../../components/FiltroBusqueda";
import { Footer } from "../../components/Footer";

const images = [
  HotelOverview,
  HotelOverview2,
  HotelOverview3,
  HotelOverview4,
  HotelOverview5,
  HotelOverview6,
  HotelOverview7,
  HotelOverview8,
];

export const Home = () => {
  const { listBooking } = useHome();
  const [isListBookingFetched, setIsListBookingFetched] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (listBooking.length !== 0) {
      setIsListBookingFetched(true);
    }
  }, [listBooking]);

  console.log(listBooking);

  return (
    <>
      <NavBar />
      <div
        className="py-40 relative animate-ease-out- transition-opacity animate-duration-1000 "
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",

        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center absolute inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-60">
            <span>
              <img
                className="hidden lg:block h-32 w-auto"
                src={SnowFlakeLogo}
                alt="SnowFlake"
              />
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              ¡Bienvenidos!
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-blue-300 sm:mt-4">
              El mejor hotel para disfrutar de la nieve
            </p>
          </div>
        </div>
        <div className="absolute inset-0 "></div>
      </div>
      {isListBookingFetched ? (
        <FiltroBusquedas listBooking={listBooking} />
      ) : (
        <>
          <br />
          <br />
          <div className="flex justify-center items-center">
            <h1 className="text-2xl text-white animate-pulse">
              Cargando Reservas...
            </h1>
          </div>
        </>
      )}
      <br />
      <br />
      <Footer />
    </>
  );
};
