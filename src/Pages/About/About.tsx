import { ActivityContainer } from "../../components/ActivityContainer/ActivityContainer";
import { NavBar } from "../../components/NavBar";
import { useAbout } from "./State/useAbout";

export const About = () => {
  const { listActivities } = useAbout();
  console.log(listActivities);
  return (
    <>
      <NavBar />
      <div className="min-h-screen">
        <div className="container mx-auto py-8">
          <div className="text-white text-4xl font-bold text-center mb-8 animate-pulse">
            About Copo de Nieve
          </div>
          <div className="text-white text-lg text-center animate-fade-left">
            Bienvenido a Copo de Nieve, el hotel mágico donde los sueños se
            hacen realidad. Sumérgete en el encantador mundo invernal y vive la
            escapada definitiva. Nuestro equipo de desarrolladores apasionados
            ha creado esta extraordinaria solución de software para hacer que tu
            experiencia de reserva sea fluida e inolvidable.
          </div>
          <div className="text-white text-4xl font-bold text-center mb-8 animate-pulse">
            Actividades
          </div>
          <ActivityContainer listActivities={listActivities} />
        </div>
      </div>
    </>
  );
};
