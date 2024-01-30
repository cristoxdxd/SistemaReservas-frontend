import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto flex justify-between">
                <div className="w-1/2">
                    <h2 className="text-2xl font-bold">Contáctanos</h2>
                    <p className="mt-4">123 Calle Principal</p>
                    <p>Ciudad, Estado, Código Postal</p>
                    <p className="mt-4">Teléfono: 123-456-7890</p>
                    <p>Email: info@example.com</p>
                </div>
                <div className="w-1/2">
                    <h2 className="text-2xl font-bold">Ubicación</h2>
                    <div className="mt-4 h-64">
                        {/* Reemplaza el src del iframe con tu propio código de incrustación de mapa */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10479798.020430539!2d-138.79110874347487!3d50.11353343109969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5487234b483e04f9%3A0xb35e0b60281d80e0!2sThe%20Listel%20Hotel%20Whistler!5e0!3m2!1ses-419!2sec!4v1706612672154!5m2!1ses-419!2sec"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen
                            title="Mapa"
                        ></iframe>
                    </div>
                </div>
            </div>
        </footer>
    );
};
