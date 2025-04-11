import React from "react";
import NavbarNotAuth from "../components/NavbarNotAuth";
import WelcomePageBackground from "../components/WelcomePageBackground";
import { Link } from "react-router-dom";

const WelcomePage = () => {
    return (
    <div className='bg-[#F6F2E9] h-screen w-screen relative flex justify-center'>
        <WelcomePageBackground />
        <img src="/welcomepage/plate.png" className="absolute bottom-0 right-0 scale-70 lg:scale-85 origin-bottom-right" alt="plate"/>
        <NavbarNotAuth />
        <div className="flex flex-col items-start absolute top-1/5 lg:left-1/5 bg-[#F6F2E9] rounded-3xl max-w-2xl p-8 2xl:shadow-none shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)]">
          <p className="font-extrabold lg:text-[70px] sm:text-[60px]">
            <span className='text-[#000000]'>FOOD</span><span className='text-[#717B84]'>IARY</span>
          </p>
          <p className="text-[#717B84] font-extrabold lg:text-[32px] sm:text-[28px] pb-10">Zdrowie zaczyna się na talerzu</p>
          <p className="font-semibold text-[23px] pb-8">Zacznij jeść świadomie – twórz spersonalizowane jadłospisy, kontroluj kalorie i odkryj, jak łatwe może być zdrowe odżywianie.</p>
          <Link to="/register">
          <button className="bg-[#091B2B] self-center text-white py-5 px-10 rounded-[40px] text-[16px] font-semibold drop-shadow-2xl hover:shadow-xl transition-all cursor-pointer">
          DOŁĄCZ TERAZ!
          </button>
          </Link>
        </div>
    </div>
    );
}

export default WelcomePage;