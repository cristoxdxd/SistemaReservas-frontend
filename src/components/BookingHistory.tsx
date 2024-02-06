import React, { useState } from 'react';
import BookingDetails from './BookingDetails';
import BookingModify from './BookingModify';

interface Reservation {
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

const BookingHistory: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 1,
      roomName: 'Cabaña en el Bosque',
      checkInDate: '2022-10-01',
      checkOutDate: '2022-10-05',
      status: 'confirmada',
      nombreApellido: 'Juan Pérez',
      correoElectronico: '',
      tipoHabitacion: 'Suite',
      numAdultos: 2,
      numNinos: 1,
      serviciosAdicionales: ['Desayuno', 'Almuerzo'],
      costoTotal: 600,
    },
    {
      id: 2,
      roomName: 'Habitación Individual',
      checkInDate: '2022-11-15',
      checkOutDate: '2022-11-20',
      status: 'pendiente',
      nombreApellido: 'Juan Pérez',
      correoElectronico: '',
      tipoHabitacion: 'Doble',
      numAdultos: 2,
      numNinos: 0,
      serviciosAdicionales: ['Desayuno'],
      costoTotal: 400,
    },
    {
      id: 3,
      roomName: 'Habitación Familiar',
      checkInDate: '2022-12-10',
      checkOutDate: '2022-12-15',
      status: 'cancelada',
      nombreApellido: 'Juan Pérez',
      correoElectronico: '',
      tipoHabitacion: 'Doble',
      numAdultos: 2,
      numNinos: 1,
      serviciosAdicionales: ['Desayuno', 'Cena'],
      costoTotal: 500,
    },
  ]);

  const [viewingDetailsReservationId, setViewingDetailsReservationId] = useState<number | null>(null);


  const handleViewDetails = (reservationId: number) => {
    console.log("Viewing details for reservation id: ", reservationId);
    setViewingDetailsReservationId(reservationId);
  };

  const handleCloseDetails = () => {
    setViewingDetailsReservationId(null);
  };

  const [editingReservationId, setEditingReservationId] = useState<number | null>(null);

  const handleModifyReservation = (_reservationId: number) => {
    // Lógica para modificar la reserva
    setEditingReservationId(_reservationId);


  };
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState<number | null>(null);


  const handleCancelReservation = (reservationId: number) => {
    setReservationToCancel(reservationId);
    setShowConfirmation(true);
  };

  const confirmCancelReservation = (confirmed: boolean) => {
    if (confirmed && reservationToCancel !== null) {
      // Lógica para cancelar la reserva
      const updatedReservations = reservations.map((reservation) => {
        if (reservation.id === reservationToCancel) {
          return { ...reservation, status: 'cancelada' };
        }
        return reservation;
      });
      setReservations(updatedReservations);
    }

    // Reiniciar los estados después de procesar la cancelación
    setReservationToCancel(null);
    setShowConfirmation(false);
  };

  const handleCancelModification = () => {
    setEditingReservationId(null); // Cancela la modificación y cierra el modo de edición
  };

  const handleSaveModifiedReservation = (reservationId: number, newCheckInDate: string, newCheckOutDate: string) => {
    // Implementa la lógica para guardar la reserva modificada aquí
    // Actualiza las fechas de check-in y check-out en el estado
    const updatedReservations = reservations.map((reservation) =>
      reservation.id === reservationId
        ? { ...reservation, checkInDate: newCheckInDate, checkOutDate: newCheckOutDate }
        : reservation
    );
    setReservations(updatedReservations);
    setEditingReservationId(null); // Cierra el modo de edición después de guardar
  };

  return (
    <>
      <div className="container mx-auto bg-white p-4">
        <h1 className="text-2xl font-bold mb-4 text-blue-500">Historial de Reservaciones</h1>
        {reservations.length === 0 ? (
          <p>No hay reservas disponibles. Puedes realizar una nueva reserva en la página <a href="/">Home</a>.</p>
        ) : (
          <>
            {viewingDetailsReservationId !== null ? (
              <BookingDetails
              reservationId={viewingDetailsReservationId}
              onClose={handleCloseDetails}
              reservas={reservations}
            />
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Habitación</th>
                      <th className="px-4 py-2">Check-in</th>
                      <th className="px-4 py-2">Check-out</th>
                      <th className="px-4 py-2">Estado</th>
                      <th className="px-4 py-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td className="border px-4 py-2">{reservation.roomName}</td>
                        <td className="border px-4 py-2">{reservation.checkInDate}</td>
                        <td className="border px-4 py-2">{reservation.checkOutDate}</td>
                        <td className="border px-4 py-2">{reservation.status}</td>
                        <td className="border px-4 py-2">
                          {editingReservationId === reservation.id ? (
                            <BookingModify
                              reservationId={reservation.id}
                              initialCheckInDate={reservation.checkInDate}
                              initialCheckOutDate={reservation.checkOutDate}
                              onCancel={handleCancelModification}
                              onSave={(newCheckInDate, newCheckOutDate) =>
                                handleSaveModifiedReservation(reservation.id, newCheckInDate, newCheckOutDate)
                              }
                            />
                          ) : (
                            <>
                              {reservation.status === 'pendiente' && (
                                <>
                                  <button onClick={() => handleModifyReservation(reservation.id)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                                    Modificar
                                  </button>
                                  <button onClick={() => handleCancelReservation(reservation.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                    Cancelar
                                  </button>
                                </>
                              )}
                              {reservation.status === 'confirmada' && (
                                <button onClick={() => handleCancelReservation(reservation.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                  Cancelar
                                </button>
                              )}
                              {reservation.status === 'cancelada' && (
                                <p className="text-red-500">Esta reserva ha sido cancelada.</p>
                              )}
                              <button onClick={() => handleViewDetails(reservation.id)} className="bg-green-500 text-white px-4 py-2 rounded ml-2">
                                Ver detalles de mi reserva
                              </button>
                            </>
                          )}
                          {/* Ventana emergente de confirmación */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-md">
                        <p className="mb-4">¿Seguro que quieres cancelar la reserva?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => confirmCancelReservation(true)}
                                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Sí
                            </button>
                            <button
                                onClick={() => confirmCancelReservation(false)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BookingHistory;