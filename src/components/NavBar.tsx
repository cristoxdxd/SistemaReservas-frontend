import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SnowFlakeLogo from "../assets/snowflake_nav.svg";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { auth } from "../Firebase";

export const NavBar = () => {
  const isLoggedIn = !!auth.currentUser;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);
  const loginModalRef = useRef<HTMLDivElement>(null);
  const signUpModalRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
  
  const handleLogout = async () => {
    await auth.signOut();
    if (isMobileMenuOpen) {
      // Si el menú móvil está abierto, recarga la página para cerrar sesión.
      window.location.reload();
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  return (
    <nav className="bg-gray-900 bg-opacity-90 w-full top-0 z-10 sticky">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link to={"/"}>
                <span>
                  <img
                    className="block lg:hidden h-20 w-auto"
                    src={SnowFlakeLogo}
                    alt="SnowFlake"
                  />
                  <img
                    className="hidden lg:block h-12 w-auto"
                    src={SnowFlakeLogo}
                    alt="SnowFlake"
                  />
                </span>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex">
                <Link
                  // Línea 42: Reemplaza la línea siguiente
                  className={`${
                    location.pathname === "/" ? "bg-gray-700" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } px-3 py-2 rounded-md text-sm font-medium`}
                  to={"/"}
                >
                  Inicio
                </Link>
                <Link
                  // Línea 51: Reemplaza la línea siguiente
                  className={`${
                    location.pathname === "/about"
                      ? "bg-gray-700"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } px-3 py-2 rounded-md text-sm font-medium`}
                  to={"/about"}
                >
                  Sobre Nosotros
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link
                      // Línea 60: Reemplaza la línea siguiente
                      className={`${
                        location.pathname === "/history"
                          ? "bg-gray-700"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      } px-3 py-2 rounded-md text-sm font-medium`}
                      to={"/history"}
                    >
                      Historial
                    </Link>
                    {/* Línea 62: Reemplaza la línea siguiente */}
                    <button
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      onClick={handleLogout}
                    >
                      Cerrar Sesi&oacute;n
                    </button>
                  </>
                ) : (
                  <>
                    {/* Línea 67: Reemplaza la línea siguiente */}
                    <button
                      className={`${
                        location.pathname === "/login"
                          ? "bg-gray-700"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      } px-3 py-2 rounded-md text-sm font-medium`}
                      onClick={openLoginModal}
                    >
                      Iniciar Sesi&oacute;n
                    </button>
                    {/* Línea 70: Reemplaza la línea siguiente */}
                    <button
                      className={`${
                        location.pathname === "/signup"
                          ? "bg-gray-700"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      } px-3 py-2 rounded-md text-sm font-medium`}
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
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="sm:hidden">
              <button
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={toggleMobileMenu}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isMobileMenuOpen && (
            <>
              <Link
                // Línea 115: Reemplaza la línea siguiente
                className={`${
                  location.pathname === "/" ? "bg-gray-700" : "bg-gray-900"
                } text-white block px-3 py-2 rounded-md text-base font-medium`}
                to={"/"}
              >
                Inicio
              </Link>
              <Link
                // Línea 121: Reemplaza la línea siguiente
                className={`${
                  location.pathname === "/about"
                    ? "bg-gray-700"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } block px-3 py-2 rounded-md text-base font-medium`}
                to={"/about"}
              >
                Sobre Nosotros
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    // Línea 129: Reemplaza la línea siguiente
                    className={`${
                      location.pathname === "/history"
                        ? "bg-gray-700"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } block px-3 py-2 rounded-md text-base font-medium`}
                    onClick={handleLogout}
                    to={"/"}
                  >
                    <button onClick={handleLogout}>Cerrar Sesi&oacute;n</button>
                  </Link>
                  <Link
                    // Línea 133: Reemplaza la línea siguiente
                    className={`${
                      location.pathname === "/"
                        ? "bg-gray-700"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } block px-3 py-2 rounded-md text-base font-medium`}
                    to={"/history"}
                  >
                    <a>Historial</a>
                  </Link>
                </>
              ) : (
                <>
                  {/* Línea 138: Reemplaza la línea siguiente */}
                  <button
                    className={`${
                      location.pathname === "/login"
                        ? "bg-gray-700"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } block px-3 py-2 rounded-md text-base font-medium`}
                    onClick={openLoginModal}
                  >
                    Iniciar Sesi&oacute;n
                  </button>
                  {/* Línea 141: Reemplaza la línea siguiente */}
                  <button
                    className={`${
                      location.pathname === "/signup"
                        ? "bg-gray-700"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } block px-3 py-2 rounded-md text-base font-medium`}
                    onClick={openSignUpModal}
                  >
                    Registrarse
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
