import { Link } from 'react-router-dom';

export const BookingCard = ({ name, description, price, capacity, image }: { name: string, description: string, price: string, capacity: string, image: string }) => {
    const queryParams = `?name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}&price=${encodeURIComponent(price)}&capacity=${encodeURIComponent(capacity)}&image=${encodeURIComponent(image)}`;

    return (
        <div className="bg-gray-900 rounded-lg shadow-lg p-4 sm:max-w-xs sm:min-w-xs md:max-w-sm md:min-w-sm lg:max-w-md lg:min-w-md xl:max-w-lg xl:min-w-lg card w-64">
            <img src={image} alt={name} className="w-full h-32 object-cover mb-4 rounded-lg" />
            <h2 className="text-white text-xl font-bold mb-2">{name}</h2>
            <p className="text-blue-400 mb-2">{description}</p>
            <p className="text-blue-400 mb-2">Price: {price}</p>
            <p className="text-blue-400 mb-2">Capacity: {capacity}</p>
            <Link to={`/reservepage${queryParams}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Reservar</button>
            </Link>
        </div>
    );
};
