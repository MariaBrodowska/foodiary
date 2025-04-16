import React from "react";
import {Link, useLocation} from "react-router-dom";

const NavbarNotAuth = () => {
    const location = useLocation();
    const current = (path) => {
        return location.pathname === path
    }
    return (
        <nav className="absolute top-4 lg:right-[60px] sm:right-[12px] flex lg:space-x-20 sm:space-x-8 font-semibold">
            <Link to="/" className={current("/") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Strona główna</Link>
            <Link to="/sampleplans" className={current("/sampleplans") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Gotowe plany</Link>
            <Link to="/login" className={current("/login") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Logowanie</Link>
            <Link to="/contact" className={current("/contact") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Kontakt</Link>
        </nav>
    );
}

export default NavbarNotAuth;