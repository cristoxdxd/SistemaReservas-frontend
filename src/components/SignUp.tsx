import { useForm } from "react-hook-form";
import { get, isEmpty } from "lodash";
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import SnowFlakeLogo from "../assets/snowflake_nav.svg";


interface SignUpProps {
  onSuccess: () => void;
  onFailure: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSuccess, onFailure }) => {
  const registerForm = useForm({ mode: "onBlur" });

  const onSubmit = () => {
    registerForm.trigger();

    //console.log(registerForm.formState.isValid);

    if (registerForm.formState.isValid) {
      createUserWithEmailAndPassword(
        auth,
        registerForm.getValues("email"),
        registerForm.getValues("password")
      )
        .then((response) => {
          console.log("response", response);
          onSuccess();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          onFailure;
        });
    }
  };

  useEffect(() => {
    //console.log("El objeto Auth:", auth);
  }, []);

  return (
    <>
      {/* <div className="flex flex-col items-center justify-center animate-fade-down">
        <div className="flex flex-col items-center bg-gray-800 rounded-lg shadow-lg p-8 w-80">
          <h1 className="text-2xl font-bold mb-4 text-white">Register</h1>
          <input
            {...registerForm.register("firstName", {
              required: "Este campo es requerido.",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Porfavor solo ingresa letras.",
              },
            })}
            className="w-full h-10 text-lg mb-4 px-2 py-1 border border-gray-300 rounded text-black"
            type="text"
            placeholder="Ingrese Nombre"
          />
          {!isEmpty(registerForm.formState.errors) && (
            <p className="text-red-500 mb-4">
              {
                get(
                  registerForm,
                  "formState.errors.firstName.message",
                  ""
                ) as string
              }
            </p>
          )}
          <input
            {...registerForm.register("email", {
              required: "Este campo es requerido.",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                message: "Porfavor ingresa un correo valido.",
              },
            })}
            className="w-full h-10 text-lg mb-4 px-2 py-1 border border-gray-300 rounded text-black"
            type="email"
            placeholder="Ingrese correo electronico"
          />
          {!isEmpty(registerForm.formState.errors) && (
            <p className="text-red-500 mb-4">
              {
                get(
                  registerForm,
                  "formState.errors.email.message",
                  ""
                ) as string
              }
            </p>
          )}
          <input
            {...registerForm.register("password", {
              required: "Este campo es requerido.",
              minLength: {
                value: 8,
                message: "La contrasenia debe tener al menos 8 caracteres.",
              },
            })}
            className="w-full h-10 text-lg mb-4 px-2 py-1 border border-gray-300 rounded text-black"
            type="password"
            placeholder="Ingrese contrase&ntilde;a"
          />
          {!isEmpty(registerForm.formState.errors) && (
            <p className="text-red-500 mb-4">
              {
                get(
                  registerForm,
                  "formState.errors.password.message",
                  ""
                ) as string
              }
            </p>
          )}
          <div className="flex justify-center">
            <button
              className="px-4 py-2 mt-4 bg-blue-800 text-gray-400 rounded hover:bg-blue-600"
              onClick={onSubmit}
            >
              Register
            </button>
          </div>
        </div>
      </div> */}
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-16 h-16 mr-2"  // Ajuste del tamaño del logo
            src={SnowFlakeLogo}
            alt="SnowFlake"
          />
        </a>

        <div className="mx-auto w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Bienvenido a Copo de Nieve
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Escriba su nombre</label>
                <input{...registerForm.register("firstName", {
                  required: "Este campo es requerido.",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Porfavor solo ingresa letras.",
                  },
                })} type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" />
                {!isEmpty(registerForm.formState.errors) && (
                  <p className="text-red-500 mb-4">
                    {
                      get(
                        registerForm,
                        "formState.errors.email.message",
                        ""
                      ) as string
                    }
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Escriba su e-mail</label>
                <input{...registerForm.register("email", {
                  required: "Este campo es requerido.",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                    message: "Porfavor ingresa un correo valido.",
                  },
                })} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                {!isEmpty(registerForm.formState.errors) && (
                  <p className="text-red-500 mb-4">
                    {
                      get(
                        registerForm,
                        "formState.errors.email.message",
                        ""
                      ) as string
                    }
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Escriba su contraseña</label>
                <input {...registerForm.register("password", {
                  required: "Este campo es requerido.",
                  minLength: {
                    value: 8,
                    message: "La contrasenia debe tener al menos 8 caracteres.",
                  },
                })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " />
                {!isEmpty(registerForm.formState.errors) && (
                  <p className="text-red-500 mb-4">
                    {
                      get(
                        registerForm,
                        "formState.errors.password.message",
                        ""
                      ) as string
                    }
                  </p>
                )}
              </div>
              <button onClick={onSubmit} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition duration-400 easy-in-out">Registrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
