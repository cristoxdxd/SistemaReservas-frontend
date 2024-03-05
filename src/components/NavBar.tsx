import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SnowFlakeLogo from "../assets/snowflake_nav.svg";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { auth } from "../Firebase";

export const NavBar = () => {
  const isLoggedIn = !!auth.currentUser;
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);
  const loginModalRef = useRef<HTMLDivElement>(null);
  const signUpModalRef = useRef<HTMLDivElement>(null);

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginFailed(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
    setSignUpFailed(false);
  };

  const handleClickOutsideModal = (event: MouseEvent) => {
    if (
      (loginModalRef.current &&
        !loginModalRef.current.contains(event.target as Node)) ||
      (signUpModalRef.current &&
        !signUpModalRef.current.contains(event.target as Node))
    ) {
      closeLoginModal();
      closeSignUpModal();
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to={"/"}>
            <span>
              <a className="flex items-center space-x-3 rtl:space-x-reverse">
                <img
                  className="hidden lg:block h-12 w-auto"
                  src={SnowFlakeLogo}
                  alt="SnowFlake"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Hotel Copo de Nieve</span>
              </a>
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:02505209" className="text-sm  text-black-500 dark:text-white hover:underline">(02) 505-209</a>
            {isLoggedIn ? (
              <>
                <Link
                  className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-500 easy-in-out"
                  to={"/history"}
                >
                  Historial
                </Link>
                <Link
                  className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-500 easy-in-out"
                  to={"/"}
                >
                  <button onClick={handleLogout}>Cerrar Sesi&oacute;n</button>
                </Link>
              </>
            ) : (
              <>
                <button
                  className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-500 easy-in-out"
                  onClick={openLoginModal}
                >
                  Iniciar Sesi&oacute;n
                </button>
                <button
                  className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-500 easy-in-out"
                  onClick={openSignUpModal}
                >
                  Registrarse
                </button>
              </>
            )}
            {isLoginModalOpen && (
              <div className="bg-black fixed inset-0 flex items-center justify-center z-50 bg-opacity-55">
                <div className=" p-4 rounded-md" ref={loginModalRef}>
                  {loginFailed ? (
                    <p className="text-white bg-red-500 p-2 rounded-md animate-pulse">
                      Login failed. Please try again.
                    </p>
                  ) : (
                    <Login
                      onSuccess={closeLoginModal}
                      onFailure={() => setLoginFailed(true)}
                    />
                  )}
                </div>
              </div>
            )}
            {isSignUpModalOpen && (
              <div className="bg-black fixed inset-0 flex items-center justify-center z-50 bg-opacity-55">
                <div className=" p-4 rounded-md" ref={signUpModalRef}>
                  {signUpFailed ? (
                    <p className="text-white bg-red-500 p-2 rounded-md animate-pulse">
                      Sign up failed. Please try again.
                    </p>
                  ) : (
                    <SignUp
                      onSuccess={closeSignUpModal}
                      onFailure={() => setSignUpFailed(true)}
                    />
                  )}
                </div>
              </div>
            )}
            {isLoginModalOpen && (
              <div className="bg-black fixed inset-0 flex items-center justify-center z-50 bg-opacity-55">
                <div className=" p-4 rounded-md" ref={loginModalRef}>
                  {loginFailed ? (
                    <p className="text-white bg-red-500 p-2 rounded-md animate-pulse">
                      Login failed. Please try again.
                    </p>
                  ) : (
                    <Login
                      onSuccess={closeLoginModal}
                      onFailure={() => setLoginFailed(true)}
                    />
                  )}
                </div>
              </div>
            )}
            {isSignUpModalOpen && (
              <div className="bg-black fixed inset-0 flex items-center justify-center z-50 bg-opacity-55">
                <div className=" p-4 rounded-md" ref={signUpModalRef}>
                  {signUpFailed ? (
                    <p className="text-white bg-red-500 p-2 rounded-md animate-pulse">
                      Sign up failed. Please try again.
                    </p>
                  ) : (
                    <SignUp
                      onSuccess={closeSignUpModal}
                      onFailure={() => setSignUpFailed(true)}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-white-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link
                  className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-500 easy-in-out"
                  to={"/"}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-500 easy-in-out"
                  to={"/about"}
                >
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};