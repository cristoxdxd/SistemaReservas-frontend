import React, { useState } from 'react';

interface ModifyAttendeesProps {
  currentAttendees: { adults: number; children: number };
  onModify: (newAttendees: { adults: number; children: number }) => void;
  onCancel: () => void;
  maxCapacity: { adults: number; children: number };
}

const ModifyAttendees: React.FC<ModifyAttendeesProps> = ({ currentAttendees, onModify, onCancel, maxCapacity }) => {
  const [newAdults, setNewAdults] = useState(currentAttendees.adults.toString());
  const [newChildren, setNewChildren] = useState(currentAttendees.children.toString());

  const handleModify = () => {
    const updatedAdults = parseInt(newAdults, 10);
    const updatedChildren = parseInt(newChildren, 10);

    // Validar que la nueva cantidad no exceda la capacidad máxima
    if (updatedAdults <= maxCapacity.adults && updatedChildren <= maxCapacity.children) {
      onModify({ adults: updatedAdults, children: updatedChildren });
    } else {
      // Mostrar mensaje de error o manejar la falta de disponibilidad
      console.error('No hay disponibilidad para satisfacer los nuevos requerimientos de asistentes.');
    }
  };

  return (
    <div className="bg-white p-4 border rounded">
      <h2 className="text-lg font-bold mb-4">Modificar Cantidad de Asistentes</h2>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Adultos:</label>
        <input
          type="number"
          value={newAdults}
          onChange={(e) => setNewAdults(e.target.value)}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Niños:</label>
        <input
          type="number"
          value={newChildren}
          onChange={(e) => setNewChildren(e.target.value)}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="flex justify-end">
        <button onClick={handleModify} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Confirmar asistentes
        </button>
        <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModifyAttendees;
