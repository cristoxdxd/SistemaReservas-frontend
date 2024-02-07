import React from "react";

interface Reserva {
  id: number;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  nombreApellido: string;
  correoElectronico: string;
  tipoHabitacion: string;
  numAdultos: number;
  numNinos: number;
  serviciosAdicionales: string[];
  costoTotal: number;
}

interface BookingDetailsProps {
  reservas: Reserva[];
  reservationId: number;
  onClose: () => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ reservas, reservationId, onClose }) => {
  const reserva = reservas.find(r => r.id === reservationId);

  return reserva ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white w-96 p-4 rounded-lg">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="font-semibold">Nombre y Apellido:</div>
          <div>{reserva.nombreApellido}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="font-semibold">Correo Electrónico:</div>
          <div>{reserva.correoElectronico}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="font-semibold">Tipo de Habitación:</div>
          <div>{reserva.tipoHabitacion}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="font-semibold">Check-in:</div>
          <div>{reserva.checkInDate}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="font-semibold">Check-out:</div>
          <div>{reserva.checkOutDate}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="font-semibold">Adultos:</div>
          <div>{reserva.numAdultos}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="font-semibold">Niños:</div>
          <div>{reserva.numNinos}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="font-semibold">Servicios Adicionales:</div>
          <div>{reserva.serviciosAdicionales.join(', ')}</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="font-semibold">Costo Total:</div>
          <div>{reserva.costoTotal}</div>
        </div>
      </div>
    </div>
  ) : null;
}

export default BookingDetails;
