import { useForm } from "react-hook-form";
import { get, isEmpty } from "lodash";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IAppState, useAppStore } from "../Storage";
import SnowFlakeLogo from "../assets/snowflake_nav.svg";

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
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-xl font-semibold text-white dark:text-black">
          <img className="w-12 h-12 md:w-16 md:h-16 mr-2" src={SnowFlakeLogo} alt="SnowFlake" />
          Hotel Copo de Nieve
        </a>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white text-center">
              Iniciar sesión.
            </h1>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese su e-mail</label>
                <input
                  {...loginForm.register("email", {
                    required: "Este campo es requerido.",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                      message: "Ingrese un correo válido",
                    },
                  })}
                  className={`w-full h-10 text-lg mb-4 px-2 py-1 border border-gray-300 rounded text-black ${!isEmpty(loginForm.formState.errors.email) ? "border-red-500" : ""
                    }`}
                  type="text"
                  placeholder="name@company.com"
                />
                {!isEmpty(loginForm.formState.errors.email) && (
                  <p className="text-red-500 mb-4">
                    {get(loginForm, "formState.errors.email.message", "") as string}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese su contraseña</label>
                <input
                  {...loginForm.register("password", {
                    required: "Este campo es requerido.",
                  })}
                  className={`w-full h-10 text-lg mb-4 px-2 py-1 border border-gray-300 rounded text-black ${!isEmpty(loginForm.formState.errors.password) ? "border-red-500" : ""
                    }`}
                  type="password"
                  placeholder="••••••••"
                />
                {!isEmpty(loginForm.formState.errors.password) && (
                  <p className="text-red-500 mb-4">
                    {get(loginForm, "formState.errors.password.message", "") as string}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition duration-500 easy-in-out${!loginForm.formState.isValid ? "cursor-not-allowed" : ""
                  }`}
                disabled={!loginForm.formState.isValid}
              >
                {loading ? "Signing in..." : "Iniciar sesión"}
              </button>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};
