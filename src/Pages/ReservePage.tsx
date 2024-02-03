import { NavBar } from "../components/NavBar";
import HotelOverview from "../assets/hotel-overview-1.jpg";
import { BookingForm } from "../components/BookingForm";
import { BookingPreview } from "../components/BookingPreview";
import { useLocation } from "react-router-dom";

export const ReservationForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const name = queryParams.get("name") || "Nombre no disponible";
  const description =
    queryParams.get("description") || "Descripción no disponible";
  const price = queryParams.get("price") || "Precio no disponible";
  const capacity = queryParams.get("capacity") || "Capacidad no disponible";
  const image = queryParams.get("image") || "Imagen no disponible";

  return (
    <>
      <NavBar />
      <div
        className="py-20 relative"
        style={{
          backgroundImage: `url(${HotelOverview})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70">
            <h2 className="text-3xl font-extrabold tracking-tight text-blue-500 sm:text-4xl">
              Reserva de Habitacion
            </h2>
          </div>
        </div>
        <div className="absolute inset-0 border-2 border-blue-500"></div>
      </div>

      <div className="flex max-w-7x1 mx-auto">
        <BookingForm />
        <BookingPreview
          name={name}
          description={description}
          price={price}
          capacity={capacity}
          image={image}
        />
      </div>
    </>
  );
};

export default ReservationForm;
