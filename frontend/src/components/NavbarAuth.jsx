import React from "react";
import {Link, useLocation} from "react-router-dom";

const NavbarAuth = () => {
    const location = useLocation();
    const current = (path) => {
        return location.pathname === path
    }
    return (
        <nav className="absolute top-4 lg:right-[60px] sm:right-[12px] flex lg:space-x-20 sm:space-x-8 font-semibold">
            <Link to="/" className={current("/") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Strona główna</Link>
            <Link to="/mealplans" className={current("/mealplans") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Gotowe plany</Link>
            <Link to="/myplans" className={current("/myplans") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Moje plany posiłków</Link>
            <Link to="/shoppinglist" className={current("/shoppinglist") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Lista zakupów</Link>
            <Link to="/favourite" className={current("/favourite") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Ulubione</Link>
            <Link to="/profile" className={current("/profile") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Mój profil</Link>
        </nav>
    );
}

export default NavbarAuth;