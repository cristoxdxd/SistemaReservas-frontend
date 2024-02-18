import { Link, useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { auth } from "../Firebase";
import { getCabinDetails } from "../constants/cabanias";
import { getRoomDetails } from "../constants/habitaciones";
import { putAvailability } from "../services/putAvailability";
import { BookingPreview } from "../components/BookingPreview";
import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import { Footer } from "../components/Footer";

export const ReservationForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const isLoggedIn = !!auth.currentUser;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  useEffect(() => {
    const fetchBookingDetails = () => {
      if (id?.endsWith("c")) {
        setBookingDetails(getCabinDetails(id));
      } else if (id?.endsWith("h")) {
        setBookingDetails(getRoomDetails(id));
      } else {
        console.error("Invalid id");
      }
    };

    fetchBookingDetails();
  }, [id]);

  const openModal = (modalType: string) => {
    if (modalType === "login") {
      setIsLoginModalOpen(true);
    } else {
      setIsSignUpModalOpen(true);
    }
  };

  const closeModal = (modalType: string) => {
    if (modalType === "login") {
      setIsLoginModalOpen(false);
      setLoginFailed(false);
    } else {
      setIsSignUpModalOpen(false);
      setSignUpFailed(false);
    }
  };

  const handleClickOutsideModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal("login");
      closeModal("signup");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  const updateBooking = async () => {
    const res = await putAvailability(bookingDetails);

    if (res.status === 200) {
      console.log("Booking updated successfully");
    } else {
      console.error("Error updating booking");
    }
  };

  const handleUpdateBooking = () => {
    isLoggedIn ? updateBooking() : openModal("login");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <main className="w-full h-full border border-gray flex flex-col">
      <Link
        to={"/"}
        className="absolute flex flex-row text-gray font-bold py-2 px-4 rounded-full mx-10 my-4 hover:bg-blue-400"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <p className="font-bold">Back</p>
      </Link>

      <div className="flex flex-col h-full">
        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-14 sm:flex-row sm:justify-center">
          <div className="flex flex-col items-center sm:flex-row">
            <label htmlFor="llegada" className="text-gray mt-6 mb-2">
              Llegada:
            </label>
            <input type="date" id="llegada" name="llegada" required />
          </div>
          <br></br>
          <div className="flex flex-col items-center sm:flex-row">
            <label htmlFor="salida" className="text-gray mt-6 mb-2">
              Salida:
            </label>
            <input type="date" id="salida" name="salida" required />
          </div>
        </form>

        <div className="flex justify-center items-center mt-6">
          <BookingPreview {...bookingDetails} />
        </div>

        {isLoggedIn ? (
          <div className="flex justify-center items-center mt-10">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-max"
              onClick={handleUpdateBooking}
            >
              Reservar
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-gray-900 font-bold py-2 px-4 rounded"
                onClick={() => openModal("signup")}
              >
                Sign Up
              </button>
            </div>
            <p className="text-center text-blue-500 mt-4">
              Already have an account?{" "}
              <button onClick={() => openModal("login")} className="text-blue-500">
                Log in
              </button>
              {isLoginModalOpen && (
                <div className="modal-overlay">
                  <div className="modal-content" ref={modalRef}>
                    {loginFailed ? (
                      <p className="error-message">Login failed. Please try again.</p>
                    ) : (
                      <Login onSuccess={() => closeModal("login")} onFailure={() => setLoginFailed(true)} />
                    )}
                  </div>
                </div>
              )}
              {isSignUpModalOpen && (
                <div className="modal-overlay">
                  <div className="modal-content" ref={modalRef}>
                    {signUpFailed ? (
                      <p className="error-message">Sign up failed. Please try again.</p>
                    ) : (
                      <SignUp onSuccess={() => closeModal("signup")} onFailure={() => setSignUpFailed(true)} />
                    )}
                  </div>
                </div>
              )}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default ReservationForm;
