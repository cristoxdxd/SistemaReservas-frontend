import React from 'react';

interface NavBarProfileProps {
    onProfileClick: () => void;
    onReservationsClick: () => void;
}

const NavBarProfile: React.FC<NavBarProfileProps> = ({ onProfileClick, onReservationsClick }) => {
    return (
        <nav className="bg-white sidebar">
            <ul className="flex flex-col">
                <li className="mr-4">
                    <button className="text-blue-500 hover:text-blue-700 font-bold" onClick={onProfileClick}>
                        Ver mi perfil
                    </button>
                </li>
                <hr className="my-2" /> {/* Add a horizontal line separator */}
                <li>
                    <button className="text-blue-500 hover:text-blue-700 font-bold" onClick={onReservationsClick}>
                        Ver mi historial de reservas
                    </button>
                </li>
                <hr className="my-2" /> {/* Add a horizontal line separator */}
            </ul>
        </nav>
    );
};

export default NavBarProfile;
