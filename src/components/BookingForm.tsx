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
        checkInDate: '',
        checkOutDate: '',
        apellido: '',
        cedula: '',
        thabitacion: '',
        numninos: '',
        numadul: '',
        servicios: ''
    });

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        let newErrors = { ...formErrors };
    
        // Realizar validación en tiempo real para campos específicos
        if (name === 'numninos' || name === 'numadul') {
            // Validar solo números para numninos y numadul
            if (!/^\d*$/.test(value)) {
                newValue = reservationData[name as keyof typeof reservationData];
                newErrors = { ...newErrors, [name]: `El campo ${name} debe ser un número entero` };
            } else {
                newErrors = { ...newErrors, [name]: '' };
            }
        } else if (name === 'cedula') {
            // Validar solo números para cédula
            if (!/^\d*$/.test(value)) {
                newValue = reservationData[name as keyof typeof reservationData];
                newErrors = { ...newErrors, cedula: 'La cédula solo puede contener números' };
            } else {
                newErrors = { ...newErrors, cedula: '' };
            }
        } else if (name === 'email') {
            // Validar estructura de correo electrónico
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                newValue = reservationData[name as keyof typeof reservationData];
                newErrors = { ...newErrors, [name]: 'Ingresa un correo electrónico válido' };
            } else {
                newErrors = { ...newErrors, [name]: '' };
            }
        } else if (name === 'checkInDate') {
            // Validar que la fecha de check-in no sea anterior a la fecha actual
            const currentDate = new Date();
            const selectedDate = new Date(value);
    
            if (selectedDate < currentDate) {
                newValue = reservationData[name as keyof typeof reservationData];
                newErrors = { ...newErrors, [name]: 'La fecha de check-in no puede ser anterior a la fecha actual' };
            } else {
                newErrors = { ...newErrors, [name]: '' };
            }
        } else if (name === 'checkOutDate') {
            // Validar que la fecha de check-out sea posterior a la fecha de check-in
            const checkInDate = new Date(reservationData.checkInDate);
            const selectedDate = new Date(value);
    
            if (selectedDate <= checkInDate) {
                newValue = reservationData[name as keyof typeof reservationData];
                newErrors = { ...newErrors, [name]: 'La fecha de check-out debe ser posterior a la fecha de check-in' };
            } else {
                newErrors = { ...newErrors, [name]: '' };
            }
        } else {
            // Validar solo letras para otros campos
            if (!/^[a-zA-Z]+$/.test(value)) {
                newValue = reservationData[name as keyof typeof reservationData];
                newErrors = { ...newErrors, [name]: `El campo ${name} no puede contener números` };
            } else {
                newErrors = { ...newErrors, [name]: '' };
            }
        }
    
        setFormErrors(newErrors);
        setReservationData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    }, [formErrors, reservationData]);  
    
    

    const handleReservationSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }, [reservationData]);

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
            border: 'none',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
                    {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
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
                        className={`border rounded-md w-full py-2 px-3 ${formErrors.apellido ? 'border-red-500' : ''}`}
                        required
                    />
                    {formErrors.apellido && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.apellido}</p>
                    )}
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
                        className={`border rounded-md w-full py-2 px-3 ${formErrors.cedula ? 'border-red-500' : ''}`}
                        required
                    />
                    {formErrors.cedula && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.cedula}</p>
                    )}
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
                        className={`border rounded-md w-full py-2 px-3 ${formErrors.thabitacion ? 'border-red-500' : ''}`}
                        required
                    />
                    {formErrors.thabitacion && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.thabitacion}</p>
                    )}
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
                    {formErrors.numninos && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.numninos}</p>
                    )}
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
                    {formErrors.numadul && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.numadul}</p>
                    )}
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
                        className={`border rounded-md w-full py-2 px-3 ${formErrors.servicios ? 'border-red-500' : ''}`}
                        required
                    />
                    {formErrors.servicios && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.servicios}</p>
                    )}
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
                    {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
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
                        className={`border rounded-md w-full py-2 px-3 ${formErrors.checkInDate ? 'border-red-500' : ''}`}
                        required
                    />
                    {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.checkInDate}</p>
                    )}
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
                        className={`border rounded-md w-full py-2 px-3 ${formErrors.checkOutDate ? 'border-red-500' : ''}`}
                        required
                    />
                    {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.checkOutDate}</p>
                    )}
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
