import { useState } from "react";

export const FiltroBusquedas = () => {
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [numAdults, setNumAdults] = useState<number>(1);
    const [numChildren, setNumChildren] = useState<number>(0);
    const [childAges, setChildAges] = useState<number[]>([]);

    const MAX_ADULTS_CAPACITY = 4; // Establece la capacidad máxima de adultos en la habitación
    const MAX_CHILDREN_PER_ROOM = 4; // Establece el límite máximo de niños por habitación
    const MAX_CHILD_AGE = 12; // Establece la edad máxima permitida para los niños\

    const [adultsError, setAdultsError] = useState<string | null>(null);
    const [childrenError, setChildrenError] = useState<string | null>(null);

    const handleIncrementAdults = () => {
        // Validar si ya alcanzó el límite de adultos
        if (numAdults < MAX_ADULTS_CAPACITY) {
            setNumAdults((prevNumAdults) => prevNumAdults + 1);
        } else {
            setAdultsError(`La cantidad de adultos no puede superar la capacidad máxima de ${MAX_ADULTS_CAPACITY}`);
        }
    };
    const handleDecrementAdults = () => {
        // Validar si ya es el valor mínimo
        if (numAdults > 1) {
            setNumAdults((prevNumAdults) => prevNumAdults - 1);
            setAdultsError(null); // Limpiar mensaje de error al decrementar
        }
    };

    const handleIncrementChildren = () => {
        // Validar si ya alcanzó el límite de niños
        if (numChildren < MAX_CHILDREN_PER_ROOM) {
            setNumChildren((prevNumChildren) => prevNumChildren + 1);
        } else {
            setChildrenError(`La cantidad de niños no puede superar el límite máximo de ${MAX_CHILDREN_PER_ROOM}`);
        }
    };
    const handleDecrementChildren = () => {
        // Validar si ya es el valor mínimo
        if (numChildren > 0) {
            setNumChildren((prevNumChildren) => prevNumChildren - 1);
            setChildrenError(null); // Limpiar mensaje de error al decrementar
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        
        // Limpiar mensajes de error antes de realizar nuevas validaciones
        setAdultsError(null);
        setChildrenError(null);

         // Validaciones
        if (numAdults > MAX_ADULTS_CAPACITY) {
            setAdultsError(`La cantidad de adultos no puede superar la capacidad máxima de ${MAX_ADULTS_CAPACITY}`);
            return;
        }

        if (numChildren > MAX_CHILDREN_PER_ROOM) {
            setChildrenError(`La cantidad de niños no puede superar el límite máximo de ${MAX_CHILDREN_PER_ROOM}`);
            return;
        }

        if (numChildren < 0) {
            setChildrenError("La cantidad de niños no puede ser un número negativo");
            return;
        }

        if (numChildren > 0) {
            const invalidChildAge = childAges.some((age) => age > MAX_CHILD_AGE);
            if (invalidChildAge) {
                setChildrenError(`La edad de los niños no puede superar los ${MAX_CHILD_AGE} años.`);
                return;
            }
        }

        // Aquí puedes realizar acciones con los datos del formulario, como enviarlos al servidor, etc.
        console.log("Datos del formulario:", {
            checkInDate,
            checkOutDate,
            numAdults,
            numChildren,
            childAges,
        });
    };

    return (
        <div className="flex flex-col items-center">
            <div className="bg-gray-500 bg-opacity-70 p-10 rounded-md shadow-md mx-auto mt-10">
                <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-5">      
                    <div className="mb-5 flex items-center col-span-1">
                        <label htmlFor="checkInDate" className="block text-sm font-semibold mb-1">
                            Fecha de Check-in: 
                        </label>
                        <input
                            type="date"
                            id="checkInDate"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="ml-2 block w-40 px-6 py-2 rounded-md bg-gray-200 border border-gray-300 text-sm"
                            required
                        />
                    </div>
        
                    
                    <div className="mb-5 flex items-center col-span-1">
                        <label htmlFor="checkOutDate" className="block text-sm font-semibold mb-1">
                            Fecha de Check-out:
                        </label>
                        <input
                            type="date"
                            id="checkOutDate"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            className="ml-2 block w-40 px-6 py-2 rounded-md bg-gray-200 border border-gray-300 text-sm"
                            min={checkInDate}
                            required
                        />
                    </div>
        
                    
                    <div className="mb-5 flex items-center col-span-1">
                        <label htmlFor="numAdults" className="block text-sm font-semibold mb-1">
                            Cantidad de Adultos:
                        </label>
                        <button
                            type="button"
                            className="ml-2 px-2 py-1 rounded-md bg-gray-200 border border-gray-300 text-sm"
                            onClick={handleDecrementAdults}
                        >
                            -
                        </button>
                        <span className="ml-2 text-sm">{numAdults}</span>
                        <button
                            type="button"
                            className="ml-2 px-2 py-1 rounded-md bg-gray-200 border border-gray-300 text-sm"
                            onClick={handleIncrementAdults}
                        >
                            +
                        </button>
                        {adultsError && <span className="text-red-500 ml-2">{adultsError}</span>}
                    </div>
        
                    
                    <div className="mb-5 flex items-center col-span-1">
                        <label htmlFor="numChildren" className="block text-sm font-semibold mb-1">
                            Cantidad de Niños:
                        </label>
                        <button
                            type="button"
                            className="ml-2 px-2 py-1 rounded-md bg-gray-200 border border-gray-300 text-sm"
                            onClick={handleDecrementChildren}
                        >
                            -
                        </button>
                        <span className="ml-2 text-sm">{numChildren}</span>
                        <button
                            type="button"
                            className="ml-2 px-2 py-1 rounded-md bg-gray-200 border border-gray-300 text-sm"
                            onClick={handleIncrementChildren}
                        >
                            +
                        </button>
                        {childrenError && <span className="text-red-500 ml-2">{childrenError}</span>}
                    </div>
    
                    {numChildren > 0 && (
                        <div className="mb-5 col-span-1">
                            <label htmlFor="childAges" className="block text-sm font-semibold mb-1">
                                Edades de los Niños:
                            </label>
                            <div className="flex flex-wrap">
                                {Array.from({ length: numChildren }, (_, index) => (
                                    <div key={index} className="mb-1 w-1/2 pr-2">
                                        <label htmlFor={`childAge${index + 1}`} className="text-sm">
                                            Niño {index + 1}:
                                        </label>
                                        <input
                                            id={`childAge${index + 1}`}
                                            type="number"
                                            value={childAges[index] || ""}
                                            onChange={(e) => {
                                                const ages = [...childAges];
                                                ages[index] = parseInt(e.target.value, 10);
                                                setChildAges(ages);
                                            }}
                                            className="ml-2 w-10 px-1 py-2 rounded-md bg-gray-200 border border-gray-300 text-sm"
                                            min={0}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                
                    <button type="submit" className="bg-blue-500 text-white px-10 py-5 rounded-md">
                        Buscar
                    </button>
                </form>
            </div>
        </div>
    );
};
