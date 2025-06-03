import React, { useState, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import axios from 'axios';


const NavbarAuth = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { logout } = useLogout();
    const [userName, setUserName] = useState("");

    const current = (path) => {
        return location.pathname === path
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    }

    const handleLogout = () => {
        console.log('KLIKNIĘTO WYLOGUJ SIĘ!');
        logout();
        setIsUserMenuOpen(false);
    }

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user/email', {
                    withCredentials: true
                });   
                // console.log('Odpowiedź z serwera:', response.data);                         
                setUserName(response.data.email);
            } catch (error) {
                console.log('Błąd pobierania danych użytkownika:', error);
                // console.log('Odpowiedź z serwera:', response.data);                         

                setUserName("Użytkownik");

            }
        };
        fetchUserEmail();
    }, []);

    const activeClass = "text-[#A0B2CA] hover:text-[#748499]";
    const inactiveClass = "text-white hover:text-gray-300";

    return (
        <nav className="relative w-full px-4 py-3 bg-transparent z-[100]">
        <div className="lg:hidden flex justify-end">
            <button
                onClick={toggleMenu}
                className="text-white p-2 focus:outline-none"
            >
                {isMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                )}
            </button>
        </div>

        <div className="hidden lg:flex items-center justify-end xl:right-[60px] lg:right-[16px] xl:space-x-10 lg:space-x-6 md:space-x-4 md:text-[14px] lg:text-[16px] font-semibold">
            <Link to="/dashboard" className={current("/dashboard") ? activeClass : inactiveClass}>Strona główna</Link>
            <Link to="/mealplans" className={current("/mealplans") ? activeClass : inactiveClass}>Gotowe plany</Link>
            <Link to="/myplans" className={current("/myplans") ? activeClass : inactiveClass}>Moje plany</Link>
            <Link to="/shoppinglist" className={current("/shoppinglist") ? activeClass : inactiveClass}>Lista zakupów</Link>
            <Link to="/favourite" className={current("/favourite") ? activeClass : inactiveClass}>Ulubione</Link>
            <div className="relative">
                    <button
                        onClick={toggleUserMenu}
                        className="flex items-center text-white hover:text-gray-300 focus:outline-none z-[100]">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </button>
            
                    {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-[200] text-sm">
                        <div className="px-4 py-3 font-medium text-gray-600 border-b">
                            Zalogowany jako {userName}
                        </div>
                        <div className="py-1">
                            <Link
                                to="/profile"
                                className="flex w-full items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                            >
                                <svg className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-7 9a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Mój profil
                            </Link>
                            <Link
                                to="/settings"
                                className="flex w-full items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                            >
                                <svg className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Ustawienia
                            </Link>
                        </div>

                        <div className="border-t mx-1"></div>
                        <div className="py-1">
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center text-left px-4 py-2.5 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Wyloguj się
                            </button>
                        </div>
                    </div>
                )}
        </div>
        </div>

        {isMenuOpen && (
    <div className="lg:hidden absolute top-full right-0 left-0 bg-[#103739] bg-opacity-90 p-4 shadow-lg">
        <div className="flex flex-col space-y-4 font-semibold text-white">
            <Link
                to="/dashboard"
                className={current("/dashboard") ? activeClass : inactiveClass}
                onClick={() => setIsMenuOpen(false)}
            >
                Strona główna
            </Link>
            <Link
                to="/mealplans"
                className={current("/mealplans") ? activeClass : inactiveClass}
                onClick={() => setIsMenuOpen(false)}
            >
                Gotowe plany
            </Link>
            <Link
                to="/myplans"
                className={current("/myplans") ? activeClass : inactiveClass}
                onClick={() => setIsMenuOpen(false)}
            >
                Moje plany posiłków
            </Link>
            <Link
                to="/shoppinglist"
                className={current("/shoppinglist") ? activeClass : inactiveClass}
                onClick={() => setIsMenuOpen(false)}
            >
                Lista zakupów
            </Link>
            <Link
                to="/favourite"
                className={current("/favourite") ? activeClass : inactiveClass}
                onClick={() => setIsMenuOpen(false)}
            >
                Ulubione
            </Link>

            <div className="border-t border-gray-600 pt-4 space-y-3">
                <div className="text-gray-400 text-sm">Konto użytkownika</div>

                <Link
                    to="/profile"
                    className="flex items-center text-white hover:text-[#A0B2CA]"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Mój profil
                </Link>

                <Link
                    to="/settings"
                    className="flex items-center text-white hover:text-[#A0B2CA]"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317a1.724 1.724 0 013.35 0 1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Ustawienia
                </Link>

                <button
                    onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                    }}
                    className="flex items-center text-red-400 hover:text-red-500"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Wyloguj się
                </button>
            </div>
        </div>
    </div>
)}

        </nav>
    );
}

export default NavbarAuth;