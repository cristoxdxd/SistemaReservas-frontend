import React from 'react';

interface ProfileProps {
    username: string;
    email: string;
    age: number;
    location: string;
}

const Profile: React.FC<ProfileProps> = ({ username, email, age, location }) => {


    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-blue-500">Mi Perfil</h1>
            <h1 className="text-xl mb-2">Perfil de {username}</h1>
            <p className="text-gray-700">Email: {email}</p>
            <p className="text-gray-700">Edad: {age} años</p>
            <p className="text-gray-700">Ubicación: {location}</p>
            {/* Otros detalles del perfil */}
        </div>
    );
};

export default Profile;
