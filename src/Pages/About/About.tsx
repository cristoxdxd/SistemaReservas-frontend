import { useEffect, useState } from "react";
import { ActivityContainer } from "../../components/ActivityContainer/ActivityContainer";
import { NavBar } from "../../components/NavBar";
import { useAbout } from "./State/useAbout";
import { Footer } from "../../components/Footer";

export const About = () => {
  const { listActivities } = useAbout();
  const [isListActivitiesFetched, setIsListActivitiesFetched] = useState(false);
  
  useEffect(() => {
    if (listActivities.length !== 0) {
      setIsListActivitiesFetched(true);
    }
  }, [listActivities]);
  console.log(listActivities);

  return (
    <>
      <NavBar />
      <div className="min-h-screen">
        <div className="container mx-auto py-8">
          <div className="text-white text-4xl font-bold text-center mb-8 animate-pulse">
            Sobre Nosotros
          </div>
          <div className="text-white text-lg text-center animate-fade-left">
            Bienvenido a Copo de Nieve, el hotel mágico donde los sueños se
            hacen realidad. Sumérgete en el encantador mundo invernal y vive la
            escapada definitiva. Nuestro equipo de desarrolladores apasionados
            ha creado esta extraordinaria solución de software para hacer que tu
            experiencia de reserva sea fluida e inolvidable.
          </div>
          <br />
          <div className="text-white text-4xl font-bold text-center mb-8">
            Actividades
          </div>
          {isListActivitiesFetched ? (
            <ActivityContainer listActivities={listActivities} />
          ) : (
            <div className="flex justify-center items-center">
              <h1 className="text-2xl text-white animate-pulse">Cargando Actividades...</h1>
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
