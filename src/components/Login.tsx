import { useForm } from "react-hook-form";
import { get, isEmpty } from "lodash";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const loginForm = useForm({ mode: "onBlur" });

  const onSubmit = () => {
    loginForm.trigger();

    console.log(loginForm.formState.isValid);

    if (loginForm.formState.isValid) {
      signInWithEmailAndPassword(
        auth,
        loginForm.getValues().email,
        loginForm.getValues().password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          sessionStorage.setItem("user", JSON.stringify(user));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center animate-fade-down">
        <div className="flex flex-col items-center bg-gray-800 rounded-lg shadow-lg p-8 w-80">
        {/* <h1 className="text-2xl font-bold mb-4 text-white">Login</h1> */}
          <input
            {...loginForm.register("email", {
              required: "Este campo es requerido.",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                message: "Porfavor ingresa un correo válido.",
              },
            })}
            className="w-full h-10 text-lg mb-4 px-2 py-1 border border-gray-300 rounded"
            type="text"
            placeholder="Ingrese correo"
          />
          {!isEmpty(loginForm.formState.errors) && (
            <p className="text-red-500 mb-4">
              {
                get(
                  loginForm,
                  "formState.errors.email.message",
                  ""
                ) as string
              }
            </p>
          )}
          <input
            {...loginForm.register("password", {
              required: "Este campo es requerido.",
              minLength: {
                value: 8,
                message: "La contrase&ntilde;a debe tener al menos 8 caracteres.",
              },
            })}
            className="w-full h-10 text-lg mb-4 px-2 py-1 border border-gray-300 rounded"
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
            <button
              className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={onSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
