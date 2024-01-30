import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import Modal from 'react-modal';

export const BookingForm = () => {
    const [reservationData, setReservationData] = useState({
        name: '',
        email: '',
        checkInDate: '',
        checkOutDate: '',
        apellido: '',
        cedula: '',
        thabitacion: '',
        numninos: '',
        numadul: '',
        servicios: ''
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        numninos: '',
        numadul: '',
        // Agrega más campos según sea necesario
    });

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReservationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Limpiar mensaje de error al cambiar el valor del campo
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    }, []);

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
    
        if (!reservationData.name.trim()) {
            errors.name = 'El nombre es requerido';
        }
    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reservationData.email)) {
            errors.email = 'Ingresa un correo electrónico válido';
        }
    
        if (!/^\d+$/.test(reservationData.numninos)) {
            errors.numninos = 'El número de niños debe ser un número entero';
        }
    
        if (!/^\d+$/.test(reservationData.numadul)) {
            errors.numadul = 'El número de adultos debe ser un número entero';
        }
    
        setFormErrors(prevErrors => ({
            ...prevErrors,
            ...errors
        }));
    
        return Object.keys(errors).length === 0;
    };
    

    const handleReservationSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Datos de la reserva:', reservationData);
            setModalIsOpen(true);
        }
    }, [reservationData, validateForm]);

    const closeModal = () => {
        // Cerrar el modal y limpiar los campos después de cerrar el modal
        setModalIsOpen(false);
        setReservationData({
            name: '',
            email: '',
            checkInDate: '',
            checkOutDate: '',
            apellido: '',
            cedula: '',
            thabitacion: '',
            numninos: '',
            numadul: '',
            servicios: ''
        });
    };

    const customModalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none', // Puedes agregar más estilos según tus necesidades
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente detrás del modal
        },
    };

    return (
        <>
            <form onSubmit={handleReservationSubmit} className="max-w-6x1 mx-auto bg-white p-8 rounded-md shadow-md my-8 mx-8 w-1/2">
            <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={reservationData.name}
                        onChange={handleInputChange}
                        className={`border rounded-md w-full py-2 px-3 ${formErrors.name ? 'border-red-500' : ''}`}
                        required
                    />
                    {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="apellido" className="block text-gray-700 text-sm font-bold mb-2">
                        Apellido
                    </label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={reservationData.apellido}
                        onChange={handleInputChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cedula" className="block text-gray-700 text-sm font-bold mb-2">
                        Cedula
                    </label>
                    <input
                        type="text"
                        id="cedula"
                        name="cedula"
                        value={reservationData.cedula}
                        onChange={handleInputChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="thabitacion" className="block text-gray-700 text-sm font-bold mb-2">
                        Tipo de Habitacion
                    </label>
                    <input
                        type="text"
                        id="thabitacion"
                        name="thabitacion"
                        value={reservationData.thabitacion}
                        onChange={handleInputChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="numninos" className="block text-gray-700 text-sm font-bold mb-2">
                        Numero de niños
                    </label>
                    <input
                        type="text"
                        id="numninos"
                        name="numninos"
                        value={reservationData.numninos}
                        onChange={handleInputChange}
                        className={`border rounded-md w-full py-2 px-3 ${formErrors.numninos ? 'border-red-500' : ''}`}
                        required
                    />
                    {formErrors.numninos && <p className="text-red-500 text-sm">{formErrors.numninos}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="numadul" className="block text-gray-700 text-sm font-bold mb-2">
                        Numero de adultos
                    </label>
                    <input
                        type="text"
                        id="numadul"
                        name="numadul"
                        value={reservationData.numadul}
                        onChange={handleInputChange}
                        className={`border rounded-md w-full py-2 px-3 ${formErrors.numadul ? 'border-red-500' : ''}`}
                        required
                    />
                    {formErrors.numadul && <p className="text-red-500 text-sm">{formErrors.numadul}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="servicios" className="block text-gray-700 text-sm font-bold mb-2">
                        Servicios Adicionales
                    </label>
                    <input
                        type="text"
                        id="servicios"
                        name="servicios"
                        value={reservationData.servicios}
                        onChange={handleInputChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={reservationData.email}
                        onChange={handleInputChange}
                        className={`border rounded-md w-full py-2 px-3 ${formErrors.email ? 'border-red-500' : ''}`}
                        required
                    />
                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="checkInDate" className="block text-gray-700 text-sm font-bold mb-2">
                        Fecha de Check-In
                    </label>
                    <input
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={reservationData.checkInDate}
                        onChange={handleInputChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="checkOutDate" className="block text-gray-700 text-sm font-bold mb-2">
                        Fecha de Check-Out
                    </label>
                    <input
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={reservationData.checkOutDate}
                        onChange={handleInputChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Reservar Ahora
                </button>
            </form>
            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Detalles de la Reserva"
                style={customModalStyles}
            >
                <h2>Reserva Exitosa</h2>
                <p>Detalles de la reserva:</p>
                <pre>{JSON.stringify(reservationData, null, 2)}</pre>
                <button onClick={closeModal}>Cerrar</button>
            </Modal>
        </>
    );
};
