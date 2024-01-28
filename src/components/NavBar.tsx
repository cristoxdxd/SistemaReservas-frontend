import { useState } from "react";
import { Link } from "react-router-dom";
import SnowFlakeLogo from "../assets/snowflake_nav.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <a>
                                <img
                                    className="block lg:hidden h-12 w-auto"
                                    src={SnowFlakeLogo}
                                    alt="ComicVerse"
                                />
                                <img
                                    className="hidden lg:block h-12 w-auto"
                                    src={SnowFlakeLogo}
                                    alt="ComicVerse"
                                />
                            </a>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                    <Link to={"/"}>Home</Link>
                                </a>
                                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    <Link to={"/about"}>About</Link>
                                </a>
                                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    <Link to={"/login"}>Login</Link>
                                </a>
                                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    <Link to={"/signup"}>Sign Up</Link>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-2 py-1 rounded-md sm:ml-2"
                        />
                        
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
                            <a className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                                <Link to={"/"}>Home</Link>
                            </a>
                            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                <Link to={"/about"}>About</Link>
                            </a>
                            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                <Link to={"/login"}>Login</Link>
                            </a>
                            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                <Link to={"/signup"}>Sign Up</Link>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
