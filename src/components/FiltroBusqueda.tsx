import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Booking } from "../models/Booking.interface";
import { BookingContainer } from "./BookingContainer/BookingContainer";

interface IFiltroBusquedasProps {
  listBooking: Booking[]; // Cambia 'any' por el tipo correcto de tus datos de reserva
}

export const FiltroBusquedas = ({
  listBooking,
}: IFiltroBusquedasProps) => {

  const [isAnimating] = useState(false);

  const today = new Date();
  today.setDate(today.getDate() + 1);

  const minDate = today.toISOString().split("T")[0];

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const handleCheckInDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckInDate = e.target.value;
    setCheckInDate(newCheckInDate);
    // Al cambiar la fecha de check-in, asegúrate de que la fecha de check-out sea válida
    if (checkOutDate < newCheckInDate) {
      setCheckOutDate(newCheckInDate);
    }
  };

  const handleCheckOutDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckOutDate = e.target.value;
    // Solo actualiza la fecha de check-out si es después de la fecha de check-in
    if (newCheckOutDate >= checkInDate) {
      setCheckOutDate(newCheckOutDate);
    }
  };

  const [numAdults, setNumAdults] = useState<number>(1);
  const [numChildren, setNumChildren] = useState<number>(0);
  const [numBabies, setNumBabies] = useState<number>(0);
  const [childAges] = useState<number[]>([]);
  const [isServiceAnimal, setIsServiceAnimal] = useState<boolean>(false);

  const MAX_ADULTS_CAPACITY = 4; // Establece la capacidad máxima de adultos en la habitación
  const MAX_CHILDREN_PER_ROOM = 4; // Establece el límite máximo de niños por habitación
  const MAX_CHILD_AGE = 12; // Establece la edad máxima permitida para los niños
  const MAX_BABY_AGE = 2; // Establece la edad máxima permitida para los bebés

  const [, setAdultsError] = useState<string | null>(null);
  const [, setChildrenError] = useState<string | null>(null);
  const [, setBabiesError] = useState<string | null>(null);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setAdultsError(null);
    setChildrenError(null);
    setBabiesError(null);

    if (numAdults > MAX_ADULTS_CAPACITY) {
      setAdultsError(
        `La cantidad de adultos no puede superar la capacidad máxima de ${MAX_ADULTS_CAPACITY}`
      );
      return;
    }

    if (numChildren > MAX_CHILDREN_PER_ROOM) {
      setChildrenError(
        `La cantidad de niños no puede superar el límite máximo de ${MAX_CHILDREN_PER_ROOM}`
      );
      return;
    }

    if (numBabies > MAX_CHILDREN_PER_ROOM) {
      setBabiesError(
        `La cantidad de bebés no puede superar el límite máximo de ${MAX_CHILDREN_PER_ROOM}`
      );
      return;
    }

    if (numChildren < 0) {
      setChildrenError("La cantidad de niños no puede ser un número negativo");
      return;
    }

    if (numBabies < 0) {
      setBabiesError("La cantidad de bebés no puede ser un número negativo");
      return;
    }

    if (numChildren > 0) {
      const invalidChildAge = childAges.some((age) => age > MAX_CHILD_AGE);
      if (invalidChildAge) {
        setChildrenError(
          `La edad de los niños no puede superar los ${MAX_CHILD_AGE} años.`
        );
        return;
      }
    }

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

  const handleButtonClick = () => {
    console.log("Se dio click en el botón de búsqueda")
  };
  

  const isFormValid = checkInDate && checkOutDate;

  const [showCheckInLabel, setShowCheckInLabel] = useState(true);
  const [showCheckOutLabel, setShowCheckOutLabel] = useState(true);
  const [showQuien, setShowQuien] = useState(false);


  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-900 bg-opacity-70 p-10 rounded-md shadow-md mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-center gap-5"
        >
          <div className="flex items-center">
            <label
              htmlFor="checkInDate"
              className={`block text-sm font-semibold text-white animate-jump ${showCheckInLabel ? "" : "hidden"
                }`}
              onClick={() => setShowCheckInLabel(false)}
            >
              Llegada
            </label>
            <>
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
              {checkInDate && (
                <span className="ml-2 text-sm text-white">{checkInDate}</span>
              )}
            </>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="checkOutDate"
              className={`block text-sm font-semibold text-white animate-jump ${showCheckOutLabel ? "" : "hidden"
                }`}
              onClick={() => setShowCheckOutLabel(false)}
            >
              Salida
            </label>
            <>
              {!showCheckOutLabel && (
                <input
                  type="date"
                  id="checkOutDate"
                  value={checkOutDate}
                  onChange={handleCheckOutDateChange}
                  className="ml-2 block w-40 px-6 py-2 rounded-md bg-blue-500 border border-blue-500 text-sm text-white"
                  min={minDate}
                  required
                />
              )}
              {checkOutDate && (
                <span className="ml-2 text-sm text-white">{checkOutDate}</span>
              )}
            </>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-900 bg-opacity-70 p-4 rounded-md shadow-md mx-auto">
              <div className="flex flex-wrap justify-center gap-5">
                <div className="flex items-center">
                  <label
                    htmlFor="quien"
                    className={`block text-sm font-semibold text-white ${isAnimating ? "animate-fade-left" : "animate-jump"
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
                        <input
                          type="number"
                          id="numAdults"
                          value={numAdults}
                          onChange={(e) =>
                            setNumAdults(parseInt(e.target.value, 10))
                          }
                          className="ml-2 block w-16 px-2 py-1 rounded-md bg-gray-200 border border-gray-300 text-sm"
                          min={1}
                          required
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="numChildren"
                          className={`block text-sm font-semibold mb-1 text-white`}
                        >
                          Niños
                        </label>
                        <input
                          type="number"
                          id="numChildren"
                          value={numChildren}
                          onChange={(e) =>
                            setNumChildren(parseInt(e.target.value, 10))
                          }
                          className="ml-2 block w-16 px-2 py-1 rounded-md bg-gray-200 border border-gray-300 text-sm"
                          min={0}
                          required
                        />
                        <span className="ml-2 text-sm text-white">{`De 2 a ${MAX_CHILD_AGE} años`}</span>
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="numBabies"
                          className={`block text-sm font-semibold mb-1 text-white`}
                        >
                          Bebés
                        </label>
                        <input
                          type="number"
                          id="numBabies"
                          value={numBabies}
                          onChange={(e) =>
                            setNumBabies(parseInt(e.target.value, 10))
                          }
                          className="ml-2 block w-16 px-2 py-1 rounded-md bg-gray-200 border border-gray-300 text-sm"
                          min={0}
                          required
                        />
                        <span className="ml-2 text-sm text-white">{`Menos de ${MAX_BABY_AGE} años`}</span>
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
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md sm:px-6 sm:py-3 md:px-8 md:py-4 h-12 transition duration-500 easy-in-out${!isFormValid ? "cursor-not-allowed" : ""
              } animate-jump`}
            disabled={!isFormValid}
            onClick={handleButtonClick} // Agrega esta línea
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>

        </form>
      </div>
      <br />
      <br />
      <BookingContainer listBooking={listBooking} checkin={checkInDate}
        checkout={checkOutDate} numAdults={numAdults} numChildren={numChildren} numBabies={numBabies} childAges={childAges} isServiceAnimal={isServiceAnimal} />
    </div>
  );
};