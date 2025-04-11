import React from "react";
import WelcomePageBackground from "../components/WelcomePageBackground";
import { Link } from "react-router-dom";


const LoginPage = () => {
    return (
    <div className='bg-[#F6F2E9] h-screen w-screen relative flex justify-center items-center'>
        <WelcomePageBackground />

        <p className="font-extrabold text-[48px] absolute top-0 lg:left-64">
            <span className='lg:text-[#000000] md:text-[#d4d4d4]'>FOOD</span>
            <span className='lg:text-[#717B84] md:text-[#c5daee]'>IARY</span>
        </p>

        <form className="flex flex-col relative items-center w-2/3 max-w-3xl bg-[#ffffff] rounded-[30px] lg:px-20 lg:py-13 sm:p-15 shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)]">
            <p className="text-[#000000] font-bold lg:text-[48px] sm:text-[38px] pb-5">Logowanie</p>
            <p className="text-[#979797] font-medium lg:text-[24px] sm:text-[20px] text-center">
                Witaj ponownie! Zaloguj się do swojego konta</p>

            <p className="text-[#000000] font-semibold text-[22px] self-start pt-12 pb-2">Email</p>
            <input type="text" id="email" name="email" required className="border-1 border-solid border-[#000000] rounded-[20px] w-full p-4"/>

            <p className="text-[#000000] font-semibold text-[22px] self-start pt-8 pb-2">Hasło</p>
            <input type="password" id="password" name="password" required className="border-1 border-solid border-[#000000] rounded-[20px] w-full p-4"/>

            <Link to="forgot-password" className="text-[#979797] font-semibold text-[22px] self-end pt-2 pb-8 cursor-pointer">Zapomniałeś hasła?</Link>

            <input type="submit" className="bg-[#091B2B] self-center text-white py-5 px-15 rounded-[40px] text-[16px] font-semibold drop-shadow-2xl hover:shadow-xl transition-all cursor-pointer" value="ZALOGUJ SIĘ"/>
            
            <p className="text-[#000000] font-semibold text-[20px] mt-8 text-center">
                Nie masz konta? 
                <Link to="/register" className="font-extrabold cursor-pointer"> Zarejestruj się</Link>
            </p>

        </form>
    </div>
    );
}

export default LoginPage;