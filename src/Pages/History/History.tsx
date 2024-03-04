import { NavBar } from "../../components/NavBar";
import { HistoryContainer } from "../../components/HistoryContainer/HistoryContainer";
import { useHistory } from "./State/useHistory";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Link } from "react-router-dom";



export const History = () => {
  const { listBooking, listAvailability } = useHistory();
  const [isListAvailabilityFetched, setIsListAvailabilyFetched] = useState(false);
  const [isListBookingFetched, setIsListBookingFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const availabilityTimeout = setTimeout(() => {
      if (listAvailability !== null && listAvailability !== undefined) {
        setIsListAvailabilyFetched(true);
      }
    }, 500);

    return () => clearTimeout(availabilityTimeout);
  }, [listAvailability]);

  useEffect(() => {
    const bookingTimeout = setTimeout(() => {
      if (listBooking !== null && listBooking !== undefined) {
        setIsListBookingFetched(true);
      }
    }, 500);

    return () => clearTimeout(bookingTimeout);
  }, [listBooking]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimeout);
  }, []);



  return (

    <>
      <NavBar />
      <br />
      <br />
      {(!isLoading && isListAvailabilityFetched && isListBookingFetched) ? (
        <>
          {(listAvailability && listBooking) ? (
            listAvailability.length !== 0 && listBooking.length !== 0 ? (
              <div className="">
                <HistoryContainer
                  listBooking={listBooking}
                  listAvailability={listAvailability}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <h1 className="text-2xl text-white mb-4">
                  No ha realizado reservas.
                </h1>
                <Link to="/">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Hacer una reserva
                  </button>
                </Link>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center">
              <h1 className="text-2xl text-white">
                Cargando Historial...
              </h1>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-2xl text-white animate-pulse">
            Cargando Historial...
          </h1>
        </div>
      )}
      <br />
      <br />
      <Footer />
    </>
  );
};


export default History;
