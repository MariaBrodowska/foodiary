import React from "react";

const NavbarNotAuth = () => {
    return(
        <nav className="absolute top-4 right-15 flex space-x-20 font-semibold">
            <a href="#welcomepage" className="text-[#A0B2CA] hover:text-[#748499]">Strona główna</a>
            <a href="#plans" className="text-white hover:text-gray-300">Gotowe plany</a>
            <a href="#login" className="text-white hover:text-gray-300">Logowanie</a>
            <a href="#contact" className="text-white hover:text-gray-300">Kontakt</a>
        </nav>
    );
}

export default NavbarNotAuth;