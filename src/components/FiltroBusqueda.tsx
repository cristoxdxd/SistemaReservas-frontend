import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Booking } from "../models/Booking.interface";
import { BookingContainer } from "./BookingContainer/BookingContainer";

interface IFiltroBusquedasProps {
  listBooking: Booking[];
}

export const FiltroBusquedas = ({
  listBooking,
}: IFiltroBusquedasProps) => {

  const [numAdults, setNumAdults] = useState<number>(1);
  const [numChildren, setNumChildren] = useState<number>(0);
  const [numBabies, setNumBabies] = useState<number>(0);
  const [childAges] = useState<number[]>([]);
  const totalCapacity = numAdults + numChildren;
  const [showQuien, setShowQuien] = useState(false);
  const [showCuanto, setShowCuanto] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(50);
  const [maxPrice, setMaxPrice] = useState<number>(300);


  return (
    <div className="flex flex-col items-center">

      <div className="bg-gray-900 bg-opacity-70 p-10 rounded-md shadow-md mx-auto mt-10">
        <form className="flex flex-wrap justify-center gap-5">
          <div className="flex flex-col items-center">
            <div>
              <MagnifyingGlassIcon style={{ height: "40px", width: "40px", color: "white" }} />
            </div>
            <div className="bg-gray-900 bg-opacity-70 p-4 rounded-md shadow-md mx-auto">

              <div className="flex flex-wrap justify-center gap-5">
                <div className="flex items-center">

                  <button
                    type="button"
                    className={`block text-sm font-semibold text-white`}
                    onClick={() => setShowQuien(!showQuien)}
                    style={{ padding: '0 8px' }}
                  >
                    Capacidad
                  </button>
                  {showQuien && (
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center">
                        <label
                          htmlFor="numAdults"
                          className={`block text-sm font-semibold mb-1 text-white`}
                        >
                          Adultos
                        </label>
                        <div className="flex items-center">
                          <div className="flex ml-2 items-center">
                            <button
                              type="button"
                              onClick={() => setNumAdults(prev => Math.max(prev - 1, 1))}
                              className="px-2 py-1 rounded-l-md bg-gray-200 border border-gray-300 text-sm"
                              disabled={numAdults === 1}
                            >
                              -
                            </button>
                            <span className="px-2 py-1 bg-gray-200 border border-gray-300 text-sm">{numAdults}</span>
                            <button
                              type="button"
                              onClick={() => setNumAdults(prev => prev + 1)}
                              className="px-2 py-1 rounded-r-md bg-gray-200 border border-gray-300 text-sm"
                              disabled={totalCapacity === 12}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <label
                          htmlFor="numChildren"
                          className={`block text-sm font-semibold mb-1 text-white`}
                        >
                          Niños
                        </label>
                        <div className="flex ml-2 items-center">
                          <button
                            type="button"
                            onClick={() => setNumChildren(prev => Math.max(prev - 1, 0))}
                            className="px-2 py-1 rounded-l-md bg-gray-200 border border-gray-300 text-sm"
                            disabled={numChildren === 0}
                          >
                            -
                          </button>
                          <span className="px-2 py-1 bg-gray-200 border border-gray-300 text-sm">{numChildren}</span>
                          <button
                            type="button"
                            onClick={() => setNumChildren(prev => prev + 1)}
                            className="px-2 py-1 rounded-r-md bg-gray-200 border border-gray-300 text-sm"
                            disabled={totalCapacity === 12}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <label
                          htmlFor="numBabies"
                          className={`block text-sm font-semibold mb-1 text-white`}
                        >
                          Bebés
                        </label>
                        <div className="flex ml-2 items-center">
                          <button
                            type="button"
                            onClick={() => setNumBabies(prev => Math.max(prev - 1, 0))}
                            className="px-2 py-1 rounded-l-md bg-gray-200 border border-gray-300 text-sm"
                            disabled={numBabies === 0}
                          >
                            -
                          </button>
                          <span className="px-2 py-1 bg-gray-200 border border-gray-300 text-sm">{numBabies}</span>
                          <button
                            type="button"
                            onClick={() => setNumBabies(prev => Math.min(prev + 1, 4))}
                            className="px-2 py-1 rounded-r-md bg-gray-200 border border-gray-300 text-sm"
                            disabled={numBabies === 4}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center">

                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>


            <div className="bg-blue-900 bg-opacity-70 p-4 rounded-md shadow-md mx-auto">
              <div className="flex items-center">
                <button
                  type="button"
                  className={`block text-sm font-semibold text-white`}
                  onClick={() => setShowCuanto(!showCuanto)}
                  style={{ padding: '0 8px' }}
                >
                  Precio
                </button>
                {showCuanto && (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center">
                      <label htmlFor="minPrice" className="text-white mr-2">Mínimo:</label>
                      <button
                        type="button"
                        onClick={() => setMinPrice(prev => Math.max(prev - 10, 0))}
                        className="px-2 py-1 rounded-l-md bg-gray-200 border border-gray-300 text-sm"
                        disabled={minPrice === 50}
                      >
                        -
                      </button>
                      <span className="px-2 py-1 bg-gray-200 border border-gray-300 text-sm">{minPrice}</span>
                      <button
                        type="button"
                        onClick={() => setMinPrice(prev => Math.min(prev + 10))}
                        className="px-2 py-1 rounded-r-md bg-gray-200 border border-gray-300 text-sm"

                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center">
                      <label htmlFor="maxPrice" className="text-white mr-2">Máximo:</label>
                      <button
                        type="button"
                        onClick={() => setMaxPrice(prev => Math.max(prev - 10, 0))}
                        className="px-2 py-1 rounded-l-md bg-gray-200 border border-gray-300 text-sm"
                        disabled={maxPrice === minPrice + 10}
                      >
                        -
                      </button>
                      <span className="px-2 py-1 bg-gray-200 border border-gray-300 text-sm">{maxPrice}</span>
                      <button
                        type="button"
                        onClick={() => setMaxPrice(prev => Math.min(prev + 10))}
                        className="px-2 py-1 rounded-r-md bg-gray-200 border border-gray-300 text-sm"

                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </form>
      </div>
      <br />
      <br />
      <BookingContainer listBooking={listBooking} numAdults={numAdults} numChildren={numChildren} numBabies={numBabies} childAges={childAges} totalCapacity={totalCapacity} minPrice={minPrice} maxPrice={maxPrice} />
    </div>
  );
};

