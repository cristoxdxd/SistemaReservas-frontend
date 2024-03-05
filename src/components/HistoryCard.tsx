import { Booking } from "../models/Booking.interface";
import {
  Availability,
  AvailabilityInput,
} from "../models/Availability.interface";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { updateAvailability } from "../services/updateAvailability";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAvailability } from "../services/deleteAvailability";
import { getOneBooking } from "../services/getOneBooking";
import { updateBookingDates } from "../services/updateBookingDates";
import { auth } from "../Firebase";
import { email } from "../models/email.interface";
import { sendEmailCancelation } from "../services/sendEmailCancelation";

interface HistoryCardProps {
  booking: Booking;
  availability: Availability;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  booking,
  availability,
}) => {
  const id = availability._id;
  const [bookingDetails, setBookingDetails] = useState<Booking | undefined>(
    undefined
  );
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalopen] = useState(false);
  const updateModalRef = useRef<HTMLDivElement>(null);
  const deleteModalRef = useRef<HTMLDivElement>(null);
  const startDate = new Date(availability.start_date);
  const endDate = new Date(availability.end_date);

  const dateRange = endDate.getTime() - startDate.getTime();
  const days = dateRange / (1000 * 60 * 60 * 24);

  const total = days * booking.price;

  const [checkInDate, setCheckInDate] = useState(availability.start_date);
  const [checkOutDate, setCheckOutDate] = useState(availability.end_date);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (availability.booking_id) {
          const bookingDetails = getOneBooking(availability.booking_id);
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
  }, [availability.booking_id]);

  async function update_booking_dates() {
    if (bookingDetails && bookingDetails.availability) {
      const updatedAvailability = bookingDetails.availability.filter(
        (avail: string) => {
          return !(
            avail === availability.start_date || avail === availability.end_date
          );
        }
      );
      updatedAvailability.push(checkInDate, checkOutDate);

      const bookingToUpdate: Booking = {
        ...bookingDetails,
        availability: updatedAvailability,
      };

      const res = await updateBookingDates(availability.booking_id ?? "", bookingToUpdate);
      if (res.status === 200) {
        console.log("Booking updated successfully");
      } else {
        console.error("Error updating booking");
      }
    }
  };

  const handleCheckInDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckInDate = e.target.value;
    setCheckInDate(newCheckInDate);
  };

  const handleCheckOutDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckOutDate = e.target.value;
    setCheckOutDate(newCheckOutDate);
  };

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalopen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalopen(false);
  };

  async function update_availability() {
    const newAvailability: AvailabilityInput = {
      booking_id: availability.booking_id,
      start_date: checkInDate,
      end_date: checkOutDate,
      user: availability.user,
    };
    const res = await updateAvailability(id, newAvailability);

    if (res.status === 200) {
      closeUpdateModal();
      console.log("Availability updated");
    } else {
      console.log("Error updating availability");
    }
  }

  const handleUpdatingAvailability = () => {
    update_booking_dates();
    update_availability();
  };

  async function update_booking_dates_delete() {
    if (bookingDetails && bookingDetails.availability) {
      const updatedAvailability = bookingDetails.availability.filter(
        (avail: string) => {
          return !(avail === availability.start_date || avail === availability.end_date);
        }
      );

      const bookingToUpdate: Booking = {
        ...bookingDetails,
        availability: updatedAvailability,
      };

      const res = await updateBookingDates(availability.booking_id ?? "", bookingToUpdate);
      if (res.status === 200) {
        console.log("Booking updated successfully");
      } else {
        console.error("Error updating booking");
      }
    }
  };

  async function delete_availability() {
    const res = await deleteAvailability(id);

    if (res.status === 200) {
      closeDeleteModal();
      console.log("Availability deleted");
    } else {
      console.log("Error deleting availability");
    }
  }

  async function send_email_cancelation() {
    const email: email = {
      email: auth.currentUser?.email ?? "",
      subject: "Reservation Cancelation",
      body: "Thank you for your reservation. We will be waiting for you. \n",
      amount: total,
      booking_id: id ?? "",
    };
    const res = await sendEmailCancelation(email);
    if (res.status == 200) {
      console.log("Email sent successfully");
    } else {
      console.error("Error sending email");
    }
  };

  const handleDeleteAvailability = () => {
    send_email_cancelation()
    update_booking_dates_delete();
    delete_availability();
  };

  const handleClickOutsideModal = (event: MouseEvent) => {
    if (
      (updateModalRef.current &&
        !updateModalRef.current.contains(event.target as Node)) ||
      (deleteModalRef.current &&
        !deleteModalRef.current.contains(event.target as Node))
    ) {
      closeUpdateModal();
      closeDeleteModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  return (
    <>
      <div
        className={`bg-gray-900 rounded-lg shadow-lg p-4 w-11/12 animate-fade-up`}
      >
        <div className="flex justify-end">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-400 hover:bg-blue-600 text-white mr-2"
            onClick={openUpdateModal}
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full bg-red-400 hover:bg-red-600 text-white"
            onClick={openDeleteModal}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center">
          <img
            src={booking.images[0]}
            alt={booking.name}
            className="w-full h-60 object-cover mb-4 rounded-lg"
          />
        </div>
        <h2 className="text-white text-4xl font-bold mb-2">{booking.name}</h2>
        {/* <p className="text-blue-400 mb-2">{booking.description}</p> */}
        <p className="text-blue-400 mb-2">Precio: ${booking.price} /noche</p>
        <p className="text-blue-400 mb-2">Precio Total: ${total}</p>
        <p className="text-blue-400 mb-2">Capacidad: {booking.capacity}</p>
        <p className="text-blue-400 mb-2">Camas: {booking.beds}</p>
        <p className="text-blue-400 mb-2">Baños: {booking.bathrooms}</p>
        <div className="flex items-center justify-center">
          <p className="text-blue-400 mb-2">
            {availability.start_date} | {availability.end_date}
          </p>
        </div>
      </div>
      {isUpdateModalOpen && (
        <div className="bg-black fixed inset-0 flex items-center justify-center z-50 bg-opacity-55">
          <div
            className="bg-gray-900 p-4 rounded-md animate-jump-in"
            ref={updateModalRef}
          >
            <form
              // onSubmit={handleSubmitUpdate}
              className="flex flex-wrap justify-center gap-5"
            >
              <div className="flex items-center">
                <label
                  htmlFor="checkInDate"
                  className="block text-sm font-semibold text-white"
                >
                  Llegada
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  value={checkInDate}
                  onChange={handleCheckInDateChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="ml-2 block w-40 px-6 py-2 rounded-md bg-gray-800 border font-bold border-blue-500 text-sm text-white"
                  required
                />
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="checkOutDate"
                  className="block text-sm font-semibold text-white"
                >
                  Salida
                </label>
                <input
                  type="date"
                  id="checkOutDate"
                  value={checkOutDate}
                  onChange={handleCheckOutDateChange}
                  className="ml-2 block w-40 px-6 py-2 rounded-md bg-gray-800 border font-bold border-blue-500 text-sm text-white"
                  required
                />
              </div>
              <div className="flex bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to={"/"}>
                  <button onClick={handleUpdatingAvailability}>
                    <p>Aceptar</p>
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="bg-black fixed inset-0 flex items-center justify-center z-50 bg-opacity-55">
          <div className=" p-4 rounded-md" ref={deleteModalRef}>
            <div className="bg-gray-900 p-4 rounded-md animate-jump-in">
              <p className="text-white text-center">
                ¿Estás seguro de que quieres eliminar esta reserva?
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <div className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  <button onClick={closeDeleteModal}>
                    <p>Cancelar</p>
                  </button>
                </div>
                <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <Link to={"/"}>
                    <button onClick={handleDeleteAvailability}>
                      <p>Eliminar</p>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
