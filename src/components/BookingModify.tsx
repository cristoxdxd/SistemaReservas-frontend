import React, { useState } from 'react';

import ModifyDates from './ModifyDates';
import ModifyAttendees from './ModifyAttendees';

interface ModifyReservationProps {
    reservationId: number;
    initialCheckInDate: string;
    initialCheckOutDate: string;
    onCancel: () => void
    onSave: (newCheckInDate: string, newCheckOutDate: string) => void;
}

const ModifyReservation: React.FC<ModifyReservationProps> = ({
    initialCheckInDate,
    initialCheckOutDate,
    onCancel,
    onSave,
}) => {
    const [modifyingDates, setModifyingDates] = useState(false);
    const [modifyingAttendees, setModifyingAttendees] = useState(false);

    const handleSaveDates = (newCheckInDate: string, newCheckOutDate: string) => {
        onSave(newCheckInDate, newCheckOutDate);
        setModifyingDates(false);
    };

    const handleCancelModifyDates = () => {
        setModifyingDates(false);
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
                <div className="flex justify-end">
                    <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <h1 className="text-2xl font-bold mb-4 text-blue-500">Modificar Reserva</h1>
                <div className="flex justify-end mb-4">
                    <button onClick={() => setModifyingDates(true)} className="bg-yellow-500 text-white px-4 py-2 rounded ml-2">
                        Modificar Fechas
                    </button>
                    <button onClick={handleModifyAttendees} className="bg-yellow-500 text-white px-4 py-2 rounded ml-2">
                        Modificar Asistentes
                    </button>
                </div>

                <div className="mt-4">
                    {modifyingDates && (
                        <ModifyDates
                            initialCheckInDate={initialCheckInDate}
                            initialCheckOutDate={initialCheckOutDate}
                            onCancel={handleCancelModifyDates}
                            onSave={handleSaveDates}
                        />
                    )}

                    {modifyingAttendees && (
                        <ModifyAttendees
                            currentAttendees={{ adults: 2, children: 1 }} // Proporciona la cantidad actual de asistentes desde tu estado o API
                            onModify={(newAttendees) => {
                                console.log('Nuevos asistentes:', newAttendees);
                                setModifyingAttendees(false);
                            }}
                            onCancel={handleCancelModifyAttendees}
                            maxCapacity={{ adults: 4, children: 2 }} // Proporciona la capacidad máxima desde tu estado o API
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModifyReservation;
