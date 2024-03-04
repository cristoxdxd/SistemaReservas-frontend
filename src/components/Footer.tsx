import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-700 text-white py-4 bottom-0 w-full">
            <div className="container mx-auto flex justify-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Hotel Copo de Nieve | All rights reserved.
                </p>
            </div>
        </footer>
    );
};
