import { NavBar } from "../../components/NavBar";
import { HistoryContainer } from "../../components/HistoryContainer/HistoryContainer";
import { useHistory } from "./State/useHistory";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";

export const History = () => {
  const { listBooking, listAvailability } = useHistory();
  const [isListAvailabilityFetched, setIsListAvailabilyFetched] =
    useState(false);
  const [isListBookingFetched, setIsListBookingFetched] = useState(false);

  useEffect(() => {
    if (listAvailability && listAvailability.length !== 0) {
      setIsListAvailabilyFetched(true);
    }
    console.log(listAvailability);
  }, [listAvailability]);

  useEffect(() => {
    if (listBooking && listBooking.length !== 0) {
      setIsListBookingFetched(true);
    }
    console.log(listBooking);
  }, [listBooking]);

  return (
    <>
      <NavBar />
      <br />
      <br />
      {isListAvailabilityFetched && isListBookingFetched ? (
        <>
          <div className="">
            <HistoryContainer
              listBooking={listBooking}
              listAvailability={listAvailability}
            />
          </div>
        </>
      ) : (
        <>
          <br />
          <br />
          <div className="flex justify-center items-center">
            <h1 className="text-2xl text-white animate-pulse">
              Cargando Historial...
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

export default History;
