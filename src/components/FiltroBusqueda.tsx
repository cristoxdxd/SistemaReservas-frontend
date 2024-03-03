import {useState } from "react";
//import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Booking } from "../models/Booking.interface";
import { BookingContainer } from "./BookingContainer/BookingContainer";

interface IFiltroBusquedasProps {
  listBooking: Booking[];
}

export const FiltroBusquedas = ({
  listBooking,
}: IFiltroBusquedasProps) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [minCheckOutDate, setMinCheckOutDate] = useState("");
  const [numAdults, setNumAdults] = useState<number>(1);
  const [numChildren, setNumChildren] = useState<number>(0);
  const [numBabies, setNumBabies] = useState<number>(0);
  const [isServiceAnimal, setIsServiceAnimal] = useState<boolean>(false);
  const [childAges] = useState<number[]>([]);
  const [showCheckInLabel, setShowCheckInLabel] = useState(true);
  const [showCheckOutLabel, setShowCheckOutLabel] = useState(true);
  const [showQuien, setShowQuien] = useState(false);
  const [adultsError, setAdultsError] = useState<string | null>(null);
  const [childrenError, setChildrenError] = useState<string | null>(null);
  const [babiesError, setBabiesError] = useState<string | null>(null);

  const today = new Date();
  today.setDate(today.getDate() + 1);
  //const minDate = today.toISOString().split("T")[0];

  const MAX_ADULTS_CAPACITY = 12;
  const MAX_CHILDREN_PER_ROOM = 9;
  const MAX_CHILD_AGE = 12;
  const MAX_BABY_AGE = 2;
  const MAX_BABY_PER_ROOM = 5;

  const handleCheckInDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckInDate = e.target.value;
    setCheckInDate(newCheckInDate);
    // Calcula la fecha mínima para checkOutDate como el día siguiente a checkInDate
    const nextDay = new Date(newCheckInDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const newMinCheckOutDate = nextDay.toISOString().split("T")[0];
    // Establece la fecha mínima para checkOutDate
    setMinCheckOutDate(newMinCheckOutDate);
    // Si checkOutDate es anterior a la nueva fecha mínima, cámbialo a la nueva fecha mínima
    if (checkOutDate < newMinCheckOutDate) {
      setCheckOutDate(newMinCheckOutDate);
    }
  };

  const handleCheckOutDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckOutDate = e.target.value;
    setCheckOutDate(newCheckOutDate);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setAdultsError(null);
    setChildrenError(null);
    setBabiesError(null);


    console.log("Datos del formulario:", {
      checkInDate,
      checkOutDate,
      numAdults,
      numChildren,
      numBabies,
      childAges,
      isServiceAnimal,
    });
  };


  const renderLabel = (showLabel: boolean, htmlFor: string, text: string, setShowLabel: React.Dispatch<React.SetStateAction<boolean>>) => {
    return (
      <>
        {showLabel && (
          <label
            htmlFor={htmlFor}
            className={`block text-sm font-semibold text-white animate-jump ${showLabel ? "" : "hidden"
              }`}
            onClick={() => setShowLabel(false)}
          >
            {text}
          </label>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-900 bg-opacity-70 p-10 rounded-md shadow-md mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-center gap-5"
        >
          <div className="flex items-center">
            {renderLabel(showCheckInLabel, "checkInDate", "Llegada", setShowCheckInLabel)}
            {!showCheckInLabel && (
              <input
                type="date"
                id="checkInDate"
                value={checkInDate}
                onChange={handleCheckInDateChange}
                min={new Date().toISOString().split("T")[0]}
                className="ml-2 block w-40 px-6 py-2 rounded-md bg-blue-500 border border-blue-500 text-sm text-white"
                required
              />
            )}
          </div>
          <div className="flex items-center">
            {renderLabel(showCheckOutLabel, "checkOutDate", "Salida", setShowCheckOutLabel)}
            {!showCheckOutLabel && (
              <input
                type="date"
                id="checkOutDate"
                value={checkOutDate}
                onChange={handleCheckOutDateChange}
                className="ml-2 block w-40 px-6 py-2 rounded-md bg-blue-500 border border-blue-500 text-sm text-white"
                min={minCheckOutDate}
                required
              />
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-900 bg-opacity-70 p-4 rounded-md shadow-md mx-auto">
              <div className="flex flex-wrap justify-center gap-5">
                <div className="flex items-center">
                  <label
                    htmlFor="quien"
                    className={`block text-sm font-semibold text-white ${showQuien ? "animate-fade-left" : "animate-jump"
                      }`}
                    onClick={() => setShowQuien(!showQuien)}
                  >
                    Quién
                  </label>
                  {showQuien && (
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center">
                        <label
                          htmlFor="numAdults"
                          className={`block text-sm font-semibold mb-1 text-white`}
                        >
                          Adultos
                        </label>
                        <select
                          id="numAdults"
                          value={numAdults}
                          onChange={(e) =>
                            setNumAdults(parseInt(e.target.value, 10))
                          }
                          className="ml-2 block w-16 px-2 py-1 rounded-md bg-gray-200 border border-gray-300 text-sm"
                          required
                        >
                          {[...Array(MAX_ADULTS_CAPACITY).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                              {num + 1}
                            </option>
                          ))}
                        </select>
                        {adultsError && <span className="text-red-500 ml-2">{adultsError}</span>}
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="numChildren"
                          className={`block text-sm font-semibold mb-1 text-white`}
                        >
                          Niños
                        </label>
                        <select
                          id="numChildren"
                          value={numChildren}
                          onChange={(e) =>
                            setNumChildren(parseInt(e.target.value, 10))
                          }
                          className="ml-2 block w-16 px-2 py-1 rounded-md bg-gray-200 border border-gray-300 text-sm"
                          required
                        >
                          {[...Array(MAX_CHILDREN_PER_ROOM + 1).keys()].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <span className="ml-2 text-sm text-white">{`De 2 a ${MAX_CHILD_AGE} años`}</span>
                        {childrenError && <span className="text-red-500 ml-2">{childrenError}</span>}
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="numBabies"
                          className={`block text-sm font-semibold mb-1 text-white`}
                        >
                          Bebés
                        </label>
                        <select
                          id="numBabies"
                          value={numBabies}
                          onChange={(e) =>
                            setNumBabies(parseInt(e.target.value, 10))
                          }
                          className="ml-2 block w-16 px-2 py-1 rounded-md bg-gray-200 border border-gray-300 text-sm"
                          required
                        >
                          {[...Array(MAX_BABY_PER_ROOM + 1).keys()].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <span className="ml-2 text-sm text-white">{`Menos de ${MAX_BABY_AGE} años`}</span>
                        {babiesError && <span className="text-red-500 ml-2">{babiesError}</span>}
                      </div>

                      <div className="flex items-center">
                        <label
                          htmlFor="isServiceAnimal"
                          className={`block text-sm font-semibold mb-1 text-white`}
                        >
                          Mascotas
                        </label>
                        <input
                          type="checkbox"
                          id="isServiceAnimal"
                          checked={isServiceAnimal}
                          onChange={(e) => setIsServiceAnimal(e.target.checked)}
                          className="ml-2"
                        />
                        <span className="ml-2 text-sm text-white">
                          ¿Traes a un animal de servicio?
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
      <br />
      <br />
      <BookingContainer
        listBooking={listBooking}
        checkin={checkInDate}
        checkout={checkOutDate}
        numAdults={numAdults}
        numChildren={numChildren}
        numBabies={numBabies}
        childAges={childAges}
        isServiceAnimal={isServiceAnimal}
      />
    </div>
  );
};



