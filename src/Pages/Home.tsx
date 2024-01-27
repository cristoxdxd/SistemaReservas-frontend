import { NavBar } from "../components/NavBar";
import HotelOverview from "../assets/hotel-overiew.jpg";

export const Home = () => {

    return(
        <>
            <NavBar />
            <div className="py-20 relative" style={{ backgroundImage: `url(${HotelOverview})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70">
                        <h2 className="text-3xl font-extrabold tracking-tight text-blue-500 sm:text-4xl">
                            Bienvenidos al Hotel Copo de Nieve
                        </h2>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-blue-300 sm:mt-4">
                            El mejor hotel para disfrutar de la nieve
                        </p>
                    </div>
                </div>
                <div className="absolute inset-0 border-2 border-blue-500"></div>
            </div>
        </>
    )
}
