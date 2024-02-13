import { useForm } from "react-hook-form";
import { get, isEmpty } from "lodash";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IAppState, useAppStore } from "../Storage";

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
      <div className="flex flex-col items-center justify-center animate-fade-down">
        <div className="flex flex-col items-center bg-gray-800 rounded-lg shadow-lg p-8 w-80">
          <h1 className="text-2xl font-bold mb-4 text-white">Entrar</h1>
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
              <div className="px-4 py-2 mt-4 bg-blue-500 text-white rounded">
                Cargando...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
