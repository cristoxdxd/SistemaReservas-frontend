import React, { useState } from 'react';
import ModifyAttendees from './ModifyAttendees';


interface ModifyReservationProps {
    reservationId: number;
    initialCheckInDate: string;
    initialCheckOutDate: string;
    onCancel: () => void;
    onSave: (newCheckInDate: string, newCheckOutDate: string) => void;
}

const ModifyReservation: React.FC<ModifyReservationProps> = ({ reservationId, initialCheckInDate, initialCheckOutDate, onCancel, onSave }) => {
    const [checkInDate, setCheckInDate] = useState(initialCheckInDate);
    const [checkOutDate, setCheckOutDate] = useState(initialCheckOutDate);
    const [modifyingAttendees, setModifyingAttendees] = useState(false);


    const handleSave = () => {
        // Realiza validaciones si es necesario antes de guardar
        // Por ejemplo, puedes verificar que las nuevas fechas sean válidas

        // Luego, llama a la función onSave con las nuevas fechas
        onSave(checkInDate, checkOutDate);
    };
    const handleModifyAttendees = () => {
        setModifyingAttendees(true);
      };
    
      const handleCancelModifyAttendees = () => {
        setModifyingAttendees(false);
      };

      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="container mx-auto bg-white p-4 rounded-lg shadow-lg w-1/2">
            <h1 className="text-2xl font-bold mb-4 text-blue-500">Modificar Reserva</h1>
            <div className="mb-4 flex">
              <div className="mr-4">
                <label htmlFor="checkInDate" className="block text-gray-700">Nuevo Check-in:</label>
                <input type="date" id="checkInDate" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="checkOutDate" className="block text-gray-700">Nuevo Check-out:</label>
                <input type="date" id="checkOutDate" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Guardar</button>
              <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
              <button onClick={handleModifyAttendees} className="bg-green-500 text-white px-4 py-2 rounded ml-2">Modificar Asistentes</button>
            </div>
            {modifyingAttendees && (
              <ModifyAttendees
                currentAttendees={{ adults: 2, children: 1 }}  // Proporciona la cantidad actual de asistentes desde tu estado o API
                onModify={(newAttendees) => {
                  console.log('Nuevos asistentes:', newAttendees);
                  setModifyingAttendees(false);
                }}
                onCancel={handleCancelModifyAttendees}
                maxCapacity={{ adults: 4, children: 2 }}  // Proporciona la capacidad máxima desde tu estado o API
              />
            )}
          </div>
        </div>
      );
    };
    
    export default ModifyReservation;