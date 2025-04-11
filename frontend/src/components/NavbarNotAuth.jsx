import React from "react";
import {Link} from "react-router-dom";

const NavbarNotAuth = () => {
    return (
        <nav className="absolute top-4 lg:right-15 sm:right-3 flex lg:space-x-20 sm:space-x-8 font-semibold">
            <Link to="/" className="text-[#A0B2CA] hover:text-[#748499]">Strona główna</Link>
            <Link to="/plans" className="text-white hover:text-gray-300">Gotowe plany</Link>
            <Link to="/login" className="text-white hover:text-gray-300">Logowanie</Link>
            <Link to="/contact" className="text-white hover:text-gray-300">Kontakt</Link>
        </nav>
    );
}

export default NavbarNotAuth;