import { useForm } from "react-hook-form";
import { get, isEmpty } from "lodash";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IAppState, useAppStore } from "../Storage";
import SnowFlakeLogo from "../assets/snowflake_nav.svg";
import { SignUp } from "./SignUp";

interface LoginProps {
  onSuccess: () => void;
  onFailure: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSuccess, onFailure }) => {
  const loginForm = useForm({ mode: "onBlur" });

  const { loading, setLoading } = useAppStore((state: IAppState) => state);

  const onSubmit = () => {
    loginForm.trigger();

    console.log(loginForm.formState.isValid);

    if (loginForm.formState.isValid) {
      setLoading(true);
      signInWithEmailAndPassword(
        auth,
        loginForm.getValues().email,
        loginForm.getValues().password
      )
        .then((response) => {
          //console.log("response", response);

          sessionStorage.setItem("user", JSON.stringify(response.user));
          setLoading(false);
          onSuccess(); // Call the onSuccess prop
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          onFailure(); // Call the onFailure prop
        });
    }
  };

  return (
    <>
      {/* <div className="flex flex-col items-center justify-center animate-fade-down">
        <div className="flex flex-col items-center bg-gray-800 rounded-lg shadow-lg p-8 w-80">
          <div className="flex justify-center mb-8">
            <img
              className="hidden lg:block h-12 w-auto"
              src={SnowFlakeLogo}
              alt="SnowFlake"
            />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-white">Iniciar Sesión</h1>
          <label className="justify-start text-sm text-white">Correo Electrónico</label>
          <input
            {...loginForm.register("email", {
              required: "Este campo es requerido.",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                message: "Ingrese un correo válido",
              },
            })}
            className="w-full h-10 text-lg mb-4 px-2 py-1 border border-gray-300 rounded text-black"
            type="text"
            placeholder="Ingrese correo"
          />
          {!isEmpty(loginForm.formState.errors) && (
            <p className="text-red-500 mb-4">
              {get(loginForm, "formState.errors.email.message", "") as string}
            </p>
          )}
          <label className="justify-start text-sm text-white">Contrase&ntilde;a</label>
          <input
            {...loginForm.register("password", {
              required: "Este campo es requerido.",
            })}
            className="w-full h-10 text-lg mb-4 px-2 py-1 border border-gray-300 rounded text-black"
            type="password"
            placeholder="Ingrese contrase&ntilde;a"
          />
          {!isEmpty(loginForm.formState.errors) && (
            <p className="text-red-500 mb-4">
              {
                get(
                  loginForm,
                  "formState.errors.password.message",
                  ""
                ) as string
              }
            </p>
          )}
          <div className="flex justify-center">
            {!loading ? (
              <button
                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={onSubmit}
              >
                Entrar
              </button>
            ) : (
              <div className="px-4 py-2 mt-4 bg-blue-800 text-gray-400 rounded">
                Cargando...
              </div>
            )}
          </div>
        </div>
      </div> */}


      <div className="flex flex-col items-center justify-center px-7 py-9 mx-auto md:h-screen lg:py-0 ">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-16 h-16 mr-2"  // Ajuste del tamaño del logo
            src={SnowFlakeLogo}
            alt="SnowFlake"
          />
        </a>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Iniciar sesión
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Su correo electrónico</label>
                <input {...loginForm.register("email", {
                  required: "Este campo es requerido.",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                    message: "Ingrese un correo válido",
                  },
                })} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                {!isEmpty(loginForm.formState.errors) && (
                  <p className="text-red-500 mb-4">
                    {get(loginForm, "formState.errors.email.message", "") as string}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Su contraseña</label>
                <input {...loginForm.register("password", {
                  required: "Este campo es requerido.",
                })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {!isEmpty(loginForm.formState.errors) && (
                  <p className="text-red-500 mb-4">
                    {
                      get(
                        loginForm,
                        "formState.errors.password.message",
                        ""
                      ) as string
                    }
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Recordar</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Olvido su contraseña?</a>
              </div>
              {!loading ? (
                <button onClick={onSubmit} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition duration-400 easy-in-out">Iniciar sesión</button>
              ) : (
                <div className="px-4 py-2 mt-4 bg-blue-800 text-gray-400 rounded">
                  Cargando...
                </div>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                No tienes una cuenta? <a href="/SingUp" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrese ahora</a>
              </p>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};
