import { Link, useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import { useEffect, useRef, useState } from "react";
import { auth } from "../Firebase";
import { getCabinDetails } from "../constants/cabanias";
import { getRoomDetails } from "../constants/habitaciones";
import { BookingPreview } from "../components/BookingPreview";
import { Footer } from "../components/Footer";
import { putAvailability } from "../services/putAvailability";

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
  const [bookingDetails, setBookingDetails] = useState<any>(null); //

  useEffect(() => {
    if (id?.endsWith("c")) {
      const bookingDetails = getCabinDetails(id);
      setBookingDetails(bookingDetails);
      console.log(bookingDetails);
    }
    if (id?.endsWith("h")) {
      const bookingDetails = getRoomDetails(id);
      setBookingDetails(bookingDetails);
      console.log(bookingDetails);
    } else {
      console.error("Invalid id");
    }
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

  const handleClickOutsideModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeLoginModal();
      closeSignUpModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  async function update_booking() {
    const res = await putAvailability(bookingDetails);

    if (res.status === 200) {
      console.log("Booking updated successfully");
    } else {
      console.error("Error updating booking");
    }
  }

  const handleUpdateBooking = () => {
    if (isLoggedIn) {
      update_booking();
    } else {
      openLoginModal();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <main className="w-[100dvw] h-[100dvh] border border-white flex flex-col">
      <Link
        to={"/"}
        className="absolute flex flex-row text-white font-bold py-2 px-4 rounded-full mx-10 my-4 hover:bg-blue-400"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <p className="font-bold">Back</p>
      </Link>
      <div>
        <div className="flex flex-colh-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center mt-14"
          >
            <label htmlFor="llegada" className="text-white mt-6 mb-2">
              Llegada:
            </label>
            <input type="date" id="llegada" name="llegada" required />

            <label htmlFor="salida" className="text-white mt-6 mb-2">
              Salida:
            </label>
            <input type="date" id="salida" name="salida" required />
          </form>

          <div className="flex justify-center items-center mt-6">
            <BookingPreview
              name={bookingDetails?.name}
              description={bookingDetails?.description}
              price={bookingDetails?.price}
              capacity={bookingDetails?.capacity}
              image={bookingDetails?.image}
            />
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={openSignUpModal} // Open SignUp modal on click
                >
                  Sign Up
                </button>
              </div>
              <p className="text-center text-white mt-4">
                Already have an account?{" "}
                <button onClick={openLoginModal} className="text-blue-500">
                  Log in
                </button>
                {isLoginModalOpen && (
                  <div className="bg-black fixed inset-0 flex items-center justify-center z-50 bg-opacity-55">
                    <div className=" p-4 rounded-md" ref={modalRef}>
                      {loginFailed ? (
                        <p className="text-white bg-red-500 p-2 rounded-md animate-pulse">
                          Login failed. Please try again.
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
      <Footer />
    </main>
  );
};

export default ReservationForm;
