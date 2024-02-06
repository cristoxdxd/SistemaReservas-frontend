import { useState } from "react";
import { NavBar } from "../components/NavBar";
import NavBarProfile from "../components/NavBarProfile";
import BookingHistory from "../components/BookingHistory";
import Profile from "./Profile";


export const UserProfile = () => {
    const [selectedOption, setSelectedOption] = useState<'profile' | 'reservations'>('profile');

    const handleProfileClick = () => {
        setSelectedOption('profile');
    };

    const handleReservationsClick = () => {
        setSelectedOption('reservations');
    };

    return (
        <div>
            <NavBar />
            <div style={{ display: 'flex' }}>
                <NavBarProfile
                    onProfileClick={handleProfileClick}
                    onReservationsClick={handleReservationsClick}
                />
                <div style={{ marginLeft: '20px', flex: 1 }}>
                    {selectedOption === 'profile' && (
                        // Aquí va el contenido de la vista del perfil de usuario
                            <Profile username={""} email={""} />
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
