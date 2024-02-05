import React from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export const NotFound: React.FC = () => {
    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-white text-7xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-white text-2xl">The page you are looking for does not exist.</p>
            </div>
            <Footer />
        </>
    );
};
