import { Link, useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import { useEffect, useRef, useState } from "react";
import { auth } from "../Firebase";
import { BookingPreview } from "../components/BookingPreview";
import { Footer } from "../components/Footer";
import { getOneBooking } from "../services/getOneBooking";
import { Booking } from "../models/Booking.interface";
import { createBooking } from "../services/createBooking";
import { AvailabilityInput } from "../models/Availability.interface";
import PaypalButton from "../components/PaypalButton/PaypalButton";
import { updateBookingDates } from "../services/updateBookingDates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ReservationForm = () => {
  // const bookingForm = useForm({ mode: "onBlur" });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const checkInDate = queryParams.get("checkin")?.toString() ?? "";
  const checkOutDate = queryParams.get("checkout")?.toString() ?? "";
  const numAdults = queryParams.get("numAdults")?.toString() ?? "";
  const numBabies = queryParams.get("numBabies")?.toString() ?? "";
  const numChildren = queryParams.get("numChildren")?.toString() ?? "";
  const childAges = queryParams.get("childAges")?.toString() ?? "";
  const childAgesArray = childAges.split(",");
  const isServiceAnimal = queryParams.get("isServiceAnimal")?.toString() ?? "";

  const today = new Date();
  today.setDate(today.getDate() + 1);

  // const minDate = today.toISOString().split("T")[0];

  console.log("id", id);
  console.log("checkInDate", checkInDate);
  console.log("checkOutDate", checkOutDate);
  console.log("numAdults", numAdults);
  console.log("numBabies", numBabies);
  console.log("numChildren", numChildren);
  console.log("childAgesArray", childAgesArray);
  console.log("isServiceAnimal", isServiceAnimal);

  const isLoggedIn = !!auth.currentUser;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [bookingDetails, setBookingDetails] = useState<Booking>({} as Booking);

  //Nuevo estado para almacenar el total
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedGuests, setSelectedGuests] = useState<number>(1); // Por defecto, 1 huésped
  //Nuevo estado para las fechas de llegada y salida
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>(
    checkInDate ? new Date(checkInDate) : undefined
  );
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    checkOutDate ? new Date(checkOutDate) : undefined
  );

  const restrictedDates = bookingDetails.availability;
  const dateRanges: Date[][] = [];

  for (let i = 0; i < (restrictedDates ?? []).length; i += 2) {
    const startDate = new Date(restrictedDates?.[i] ?? "");
    const endDate = new Date(restrictedDates?.[i + 1] ?? "");

    if (startDate && endDate) {
      const range = [];
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dateOfMonthYear = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
        range.push(dateOfMonthYear);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      dateRanges.push(range);
    }
  }

  const flattenedDateRanges = dateRanges.flat();
  const useRestrictedDates = flattenedDateRanges.map((date) => date.toString());
  console.log("restrictedDates", useRestrictedDates);

  const isDateSelectableArrival = (date: Date) =>
    !(useRestrictedDates ?? []).some(
      (restrictedDate) =>
        new Date(date).getDate() === new Date(restrictedDate).getDate() &&
        new Date(date).getFullYear() ===
          new Date(restrictedDate).getFullYear() &&
        new Date(date).getMonth() === new Date(restrictedDate).getMonth()
    ) &&
    (departureDate === undefined || new Date(date) < departureDate) &&
    new Date(date) > today;

  const isDateSelectableDeparture = (date: Date) =>
    !(useRestrictedDates ?? []).some(
      (restrictedDate) =>
        new Date(date).getDate() === new Date(restrictedDate).getDate() &&
        new Date(date).getFullYear() ===
          new Date(restrictedDate).getFullYear() &&
        new Date(date).getMonth() === new Date(restrictedDate).getMonth()
    ) &&
    (arrivalDate === undefined || new Date(date) > arrivalDate) &&
    new Date(date) > today;

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const bookingDetails = getOneBooking(id);
          setBookingDetails(await bookingDetails);
          console.log(bookingDetails);
        } else {
          console.log("Invalid id");
        }
      } catch (error) {
        console.log("Error fetching booking details", error);
      }
    };
    fetchData();
  }, [id]);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginFailed(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
    setSignUpFailed(false);
  };

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const handleClickOutsideModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeLoginModal();
      closeSignUpModal();
      closeBookingModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  async function create_booking() {
    const arrivalDateCreate = arrivalDate?.toISOString().split("T")[0] ?? "";
    const departureDateCreate =
      departureDate?.toISOString().split("T")[0] ?? "";
    const availability: AvailabilityInput = {
      booking_id: id ?? "",
      start_date: arrivalDateCreate,
      end_date: departureDateCreate,
      user: auth.currentUser?.uid ?? "",
    };
    const res = await createBooking(availability);

    if (res.status === 200) {
      console.log("Booking create successfully");
    } else {
      console.error("Error creating booking");
    }
  }

  async function update_booking_dates() {
    if (bookingDetails) {
      const bookingToUpdate: Booking = {
        ...(bookingDetails || {}),
        availability: [
          ...(bookingDetails.availability || []),
          arrivalDate?.toISOString().split("T")[0] ?? "",
          departureDate?.toISOString().split("T")[0] ?? "",
        ],
      };

      const res = await updateBookingDates(id ?? "", bookingToUpdate);
      if (res.status === 200) {
        console.log("Booking updated successfully");
      } else {
        console.error("Error updating booking");
      }
    }
  }

  const handleCreateBooking = () => {
    setIsBookingModalOpen(true);
  };

  // Lógica para calcular el total
  const calculateTotal = () => {
    if (bookingDetails) {
      const arrivalDate =
        (document.getElementById("llegada") as HTMLInputElement)?.value ?? "";
      const departureDate =
        (document.getElementById("salida") as HTMLInputElement)?.value ??
        checkOutDate;

      const startDate = new Date(arrivalDate);
      const endDate = new Date(departureDate);
      const numGuests = selectedGuests; // Usar el estado para obtener el valor actual

      const nights =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      const extraGuestsCost = 10; // Costo adicional por persona

      // Cálculo del subtotal por persona (ajustado por huésped extra)
      const basePricePerPerson = bookingDetails.price;
      const adjustedPricePerPerson =
        basePricePerPerson + (numGuests - 1) * extraGuestsCost;

      // Cálculo del total por noche
      const total = nights * adjustedPricePerPerson;

      setTotalAmount(total);
    }
  };

  // Función para manejar el cambio en la cantidad de huéspedes seleccionados
  const handleGuestsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedGuests(selectedValue);
  };

  // Efecto para actualizar el total cuando cambian los valores relevantes
  useEffect(() => {
    calculateTotal();
  }, [bookingDetails, checkInDate, checkOutDate, selectedGuests]);

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const calculateNights = () => {
    if (bookingDetails) {
      const startDate = arrivalDate?.toString() ?? "";
      const endDate = departureDate?.toString() ?? checkOutDate;

      const start = new Date(startDate);
      const end = new Date(endDate);
      const nights = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      ); // Use Math.ceil to round up to the nearest whole number
      return nights;
    }
    return 0;
  };

  return (
    <>
      <Link
        to={"/"}
        className="absolute flex flex-row text-white font-bold bg-blue-400 py-2 px-4 rounded-full mx-10 my-4 hover:bg-blue-700 transition duration-500 easy-in-out"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <p className="font-bold">Regresar</p>
      </Link>
      <div className="w-full">
        <br></br>
        <br></br>
        <br></br>
        <div className="px-20 flex justify-self-aut rounded-lg items-center bg-gray-700 animate-fade-up ml-5 mr-5 p-7">
          {/* BookingPreview */}
          {bookingDetails && (
            <BookingPreview
              _id={bookingDetails._id}
              name={bookingDetails.name}
              summary={bookingDetails.summary}
              description={bookingDetails.description}
              capacity={bookingDetails.capacity}
              price={bookingDetails.price}
              room_type={bookingDetails.room_type}
              bed_type={bookingDetails.bed_type}
              minimum_nights={bookingDetails.minimum_nights}
              maximum_nights={bookingDetails.maximum_nights}
              bedrooms={bookingDetails.bedrooms}
              beds={bookingDetails.beds}
              bathrooms={bookingDetails.bathrooms}
              images={bookingDetails.images}
              availability={bookingDetails.availability}
              reviews={bookingDetails.reviews}
            />
          )}
          <div className="ml-auto mr-auto">
            <div className="flex justify-center items-center">
              <h1 className="text-white text-4xl font-bold mt-10">
                Reserva tu estadía
              </h1>
            </div>
            <form className=" flex flex-col items-center mt-2">
              <label htmlFor="llegada" className="text-white  mt-6 mb-2">
                Llegada:
              </label>
              <DatePicker
                id="llegada"
                name="llegada"
                required
                className="ml-2 block w-40 px-6 py-2 rounded-md bg-blue-500 border border-blue-500 text-sm text-white hover:bg-blue-700 transition duration-500 easy-in-out"
                selected={arrivalDate}
                onChange={(date) => setArrivalDate(date || new Date())}
                filterDate={(date) =>
                  isDateSelectableArrival(date || new Date())
                }
              />

              <label htmlFor="salida" className="text-white mt-6 mb-2">
                Salida:
              </label>
              <DatePicker
                id="salida"
                name="salida"
                required
                className="ml-2 block w-40 px-6 py-2 rounded-md bg-blue-500 border border-blue-500 text-sm text-white hover:bg-blue-700 transition duration-500 easy-in-out"
                selected={departureDate}
                onChange={(date) => setDepartureDate(date || new Date())}
                filterDate={(date) =>
                  isDateSelectableDeparture(date || new Date())
                }
              />
              {bookingDetails && (
                <>
                  <label htmlFor="huéspedes" className="text-white mt-6 mb-2">
                    Huéspedes:
                  </label>
                  <select
                    id="huéspedes"
                    name="huéspedes"
                    value={selectedGuests}
                    onChange={handleGuestsChange} // Agregar el evento onChange
                    className="ml-2 block w-40 px-6 py-2 rounded-md bg-blue-500 border border-blue-500 text-sm text-white hover:bg-blue-700 transition duration-500 easy-in-out"
                    required
                  >
                    {/* Generar opciones dinámicamente según la disponibilidad */}
                    {[...Array(bookingDetails.capacity).keys()].map((index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1} huésped{index !== 0 && "es"}
                      </option>
                    ))}
                  </select>
                </>
              )}

              <br></br>
              <script src="https://www.paypal.com/sdk/js?client-id=AY2f43SwdopSTs-DomykC8YVjiONxiabKoYQqEzrlFZRSriocLQqEUKjXVAas2FyK0iqhhXnJOXhE8Oo&currency=USD"></script>
            </form>

            <div className="flex justify-center items-center mt-10">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-max transition duration-500 easy-in-out"
                onClick={handleCreateBooking}
              >
                Reservar
              </button>

              {isBookingModalOpen && (
                <div className="bg-black fixed inset-0 flex items-center justify-center z-50 bg-opacity-55">
                  <div className="bg-white  w-1/3 p-4 rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-m">
                    <button
                      onClick={closeBookingModal}
                      className="absolute top-0 right-0 m-4 text-red-500"
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <h2 className="text-2xl font-bold mb-4 text-blue-500">
                      Detalle de la reserva
                    </h2>
                    <div className="mb-4">
                      {arrivalDate && (
                        <p className="text-gray-700">
                          Check-in: {arrivalDate.toISOString().split("T")[0]}
                        </p>
                      )}
                      {departureDate && (
                        <p className="text-gray-700">
                          Check-out: {departureDate.toISOString().split("T")[0]}
                        </p>
                      )}
                      <p className="text-gray-700">
                        Huéspedes: {selectedGuests}
                      </p>
                    </div>
                    <hr className="border-t border-gray-300 mb-4" />

                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Precio base</p>
                      <p className="text-lg font-semibold text-blue-500">
                        ${bookingDetails?.price.toFixed(2)}
                      </p>
                    </div>

                    {selectedGuests > 1 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">
                          + Recargo por {selectedGuests - 1} huésped(es) extra
                        </p>
                        <p className="text-lg font-semibold text-blue-500">
                          ${((selectedGuests - 1) * 10).toFixed(2)}
                        </p>
                      </div>
                    )}

                    <div className="mb-4">
                      <p className="text-sm text-gray-500">
                        Subtotal por huéspedes
                      </p>
                      <p className="text-lg font-semibold text-blue-500">
                        $
                        {(bookingDetails?.price ?? 0) +
                          (selectedGuests - 1) * 10}
                      </p>
                    </div>

                    <hr className="border-t border-gray-300 mb-4" />

                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          x {calculateNights()} noches
                        </p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-blue-500">
                          Total a pagar:
                        </p>
                        <p className="text-xl font-bold text-blue-700">
                          ${totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <br></br>

                    {isLoggedIn ? (
                      <>
                        <div className="w-min max-w-xs mx-auto">
                          <PaypalButton
                            total_price={totalAmount}
                            onSuccess={() => {
                              //reserva después de un pago exitoso
                              create_booking();
                              update_booking_dates();
                              openSuccessModal();
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="mt-8">
                        <p className="text-center text-black">
                          Inicia sesión o regístrate para continuar
                        </p>
                        <br />
                        <div className="flex justify-center">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-500 easy-in-out"
                            onClick={openSignUpModal} // Open SignUp modal on click
                          >
                            Registrate
                          </button>
                        </div>
                        <p className="text-center text-black mt-4">
                          Ya tienes una cuenta?{" "}
                          <button
                            onClick={openLoginModal}
                            className="text-blue-500 hover:underline"
                          >
                            Iniciar Sesión
                          </button>
                          {isLoginModalOpen && (
                            <div className="bg-black fixed inset-0 flex items-center justify-center z-50 bg-opacity-55">
                              <div className=" p-4 rounded-md" ref={modalRef}>
                                {loginFailed ? (
                                  <p className="text-white bg-red-500 p-2 rounded-md animate-pulse">
                                    Por favor intenta de nuevo.
                                  </p>
                                ) : (
                                  <Login
                                    onSuccess={closeLoginModal}
                                    onFailure={() => setLoginFailed(true)}
                                  />
                                )}
                              </div>
                            </div>
                          )}
                          {isSignUpModalOpen && (
                            <div className="bg-black fixed inset-0 flex items-center justify-center z-50 bg-opacity-55">
                              <div className=" p-4 rounded-md" ref={modalRef}>
                                {signUpFailed ? (
                                  <p className="text-white bg-red-500 p-2 rounded-md animate-pulse">
                                    Sign up failed. Please try again.
                                  </p>
                                ) : (
                                  <SignUp
                                    onSuccess={closeSignUpModal}
                                    onFailure={() => setSignUpFailed(true)}
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isSuccessModalOpen && (
        <>
          <div className="bg-black fixed inset-0 flex items-center justify-center z-50 bg-opacity-55">
            <div className="bg-green-600 p-4 rounded-md flex flex-col items-center justify-center animate-jump-in">
              <p className="text-white font-extrabold text-2xl">
                Su pago fue completado
                <br />
                Reserva realizada con éxito
              </p>
              <br />
              <Link to={"/"}>
                <button
                  className="text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    closeBookingModal(); // Puedes cerrar la ventana emergente de reserva si es necesario
                  }}
                >
                  Volver
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
      <br />
      <br />
      <Footer />
    </>
  );
};

export default ReservationForm;
