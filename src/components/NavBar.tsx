import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SnowFlakeLogo from "../assets/snowflake_nav.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { auth } from "../Firebase";

export const NavBar = () => {
  const isLoggedIn = !!auth.currentUser;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);
  const loginModalRef = useRef<HTMLDivElement>(null);
  const signUpModalRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform search functionality here
    console.log("Search value:", searchValue);
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
    <nav className="bg-gray-800 w-full top-0 z-10 sticky">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <span>
                <img
                  className="block lg:hidden h-12 w-auto"
                  src={SnowFlakeLogo}
                  alt="SnowFlake"
                />
                <img
                  className="hidden lg:block h-12 w-auto"
                  src={SnowFlakeLogo}
                  alt="SnowFlake"
                />
              </span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex">
                <span className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                  <Link to={"/"}>Home</Link>
                </span>
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <Link to={"/about"}>About</Link>
                </span>
                {isLoggedIn ? (
                  <>
                    <button
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <Link to={"/userprofile"}>Profile</Link>
                    </a>
                  </>
                ) : (
                  <>
                    <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <button onClick={openLoginModal}>Login</button>
                    </span>
                    <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <button onClick={openSignUpModal}>Sign Up</button>
                    </span>
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
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search"
                className="px-2 py-1 rounded-md sm:ml-2"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </form>

            <button className="ml-2 bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
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
              <span className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                <Link to={"/"}>Home</Link>
              </span>
              <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                <Link to={"/about"}>About</Link>
              </span>
              {isLoggedIn ? (
                <>
                  <button
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    <Link to={"/userprofile"}>Profile</Link>
                  </a>
                </>
              ) : (
                <>
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    <button onClick={openLoginModal}>Login</button>
                  </span>
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    <button onClick={openSignUpModal}>Sign Up</button>
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
