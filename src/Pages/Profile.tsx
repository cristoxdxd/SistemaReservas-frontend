import React from 'react';

interface ProfileProps {
    username: string;
    email: string;
    // Otros datos del perfil
}

const Profile: React.FC<ProfileProps> = ({ username, email }) => {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <h1 className="text-2xl font-bold mb-4 text-blue-500">Mi Perfil</h1>
            <h1>Perfil de {username}</h1>
            <p>Email: {email}</p>
            {/* Otros detalles del perfil */}
        </div>
    );
};

export default Profile;