export const ActivitiesCard = ({ name, description, price, duration, image }: { name: string, description: string, price: string, duration: string, image: string }) => {
    return (
        <div className="bg-gray-900 rounded-lg shadow-lg p-4">
            <img src={image} alt={name} className="w-full h-32 object-cover mb-4 rounded-lg" />
            <h2 className="text-white text-xl font-bold mb-2">{name}</h2>
            <p className="text-blue-400 mb-2">{description}</p>
            <p className="text-blue-400 mb-2">Price: {price}</p>
            <p className="text-blue-400 mb-2">Duration: {duration}</p>
        </div>
    );
};