import React, { useState } from 'react';
import { NavBarUser } from "../components/NavBarUser";
import NavBarProfile from "../components/NavBarProfile";
import BookingHistory from "../components/BookingHistory";  // Importa el componente de historial de reservas

const UserProfile: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<'profile' | 'reservations'>('profile');

    const handleProfileClick = () => {
        setSelectedOption('profile');
    };

    const handleReservationsClick = () => {
        setSelectedOption('reservations');
    };

    return (
        <div>
            <NavBarUser />
            <div style={{ display: 'flex' }}>
                <NavBarProfile
                    onProfileClick={handleProfileClick}
                    onReservationsClick={handleReservationsClick}
                />
                <div style={{ marginLeft: '20px', flex: 1 }}>
                    {selectedOption === 'profile' && (
                        // Aquí va el contenido de la vista del perfil de usuario
                        <div>
                            <h2>Perfil de Usuario</h2>
                            {/* Agrega más contenido relacionado con el perfil de usuario */}
                        </div>
                    )}
                    {selectedOption === 'reservations' && (
                        // Aquí va el contenido del historial de reservas
                        <BookingHistory />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
