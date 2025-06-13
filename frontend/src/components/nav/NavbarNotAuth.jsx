import React, { useState } from "react";
import {Link, useLocation} from "react-router-dom";

const NavbarNotAuth = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    
    const current = (path) => {
        return location.pathname === path
    }
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    
    return (
        <nav className="absolute top-4 w-full px-4 lg:px-0 lg:w-auto xl:right-[60px] lg:right-[12px] font-semibold z-10">
            <div className="lg:hidden flex justify-end">
                <button 
                    onClick={toggleMenu} 
                    className="text-white focus:outline-none"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>
            
            <div className={`${isOpen ? 'flex' : 'hidden'} lg:hidden flex-col justify-self-end bg-black bg-opacity-80 mt-2 px-10 py-5 rounded-lg space-y-4`}>
                <Link to="/" 
                      onClick={toggleMenu} 
                      className={current("/") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>
                    Strona główna
                </Link>
                <Link to="/sampleplans" 
                      onClick={toggleMenu} 
                      className={current("/sampleplans") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>
                    Gotowe plany
                </Link>
                <Link to="/login" 
                      onClick={toggleMenu} 
                      className={current("/login") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>
                    Logowanie
                </Link>
                <Link to="/contact" 
                      onClick={toggleMenu} 
                      className={current("/contact") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>
                    Kontakt
                </Link>
            </div>
            
            <div className="hidden lg:flex xl:space-x-20 lg:space-x-4 lg:text-[14px] xl:text-[16px]">
                <Link to="/" className={current("/") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Strona główna</Link>
                <Link to="/sampleplans" className={current("/sampleplans") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Gotowe plany</Link>
                <Link to="/login" className={current("/login") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Logowanie</Link>
                <Link to="/contact" className={current("/contact") ? "text-[#A0B2CA] hover:text-[#748499]" : "text-white hover:text-gray-300"}>Kontakt</Link>
            </div>
        </nav>
    );
}

export default NavbarNotAuth;