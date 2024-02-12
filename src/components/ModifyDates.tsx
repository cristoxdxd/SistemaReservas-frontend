import React, { useState } from 'react';

interface ModifyDatesProps {
    initialCheckInDate: string;
    initialCheckOutDate: string;
    onCancel: () => void;
    onSave: (newCheckInDate: string, newCheckOutDate: string) => void;
}

const ModifyDates: React.FC<ModifyDatesProps> = ({
    initialCheckInDate,
    initialCheckOutDate,
    onCancel,
    onSave,
}) => {
    const [checkInDate, setCheckInDate] = useState(initialCheckInDate);
    const [checkOutDate, setCheckOutDate] = useState(initialCheckOutDate);

    const handleSave = () => {
        // Realiza validaciones si es necesario antes de guardar
        // Por ejemplo, puedes verificar que las nuevas fechas sean válidas

        // Luego, llama a la función onSave con las nuevas fechas
        onSave(checkInDate, checkOutDate);
    };

    return (
        <div className="bg-white p-4 border rounded">
            <h2 className="text-lg font-bold mb-4">Modificar Fechas</h2>
            <div className="mb-4 flex">
                <div className="mr-4">
                    <label htmlFor="checkInDate" className="block text-gray-700">
                        Nuevo Check-in:
                    </label>
                    <input
                        type="date"
                        id="checkInDate"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="checkOutDate" className="block text-gray-700">
                        Nuevo Check-out:
                    </label>
                    <input
                        type="date"
                        id="checkOutDate"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                    Confirmar nuevas fechas
                </button>
                <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default ModifyDates;
