export const BookingPreview = ({ name, description, price, capacity, image }: { name: string, description: string, price: string, capacity: string, image: string }) => {
    return (
        <div className="bg-gray-900 rounded-lg shadow-lg p-4 mx-8 my-8 w-1/2 flex items-center justify-center">
            <div className="text-center">
                <img src={image} alt={name} className="w-full h-48 object-cover mb-4 rounded-lg mx-auto" />
                <h2 className="text-white text-xl font-bold mb-2">{name}</h2>
                <p className="text-blue-400 mb-2">{description}</p>
                <p className="text-blue-400 mb-2">Price: {price}</p>
                <p className="text-blue-400 mb-2">Capacity: {capacity}</p>
            </div>
        </div>
    );
};