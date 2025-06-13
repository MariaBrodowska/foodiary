import React from "react";
import NavbarNotAuth from "../components/nav/NavbarNotAuth";
import WelcomePageBackground from "../components/common/WelcomePageBackground";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="bg-[#F6F2E9] min-h-screen w-full relative flex justify-center overflow-x-hidden">
      <WelcomePageBackground />
      <img
        src="/welcomepage/plate.png"
        className="absolute bottom-0 right-0 scale-50 sm:scale-60 lg:scale-70 xl:scale-85 origin-bottom-right pointer-events-none select-none"
        alt="plate"
      />
      <NavbarNotAuth />
      <div className="flex flex-col items-start absolute top-1/5 px-4 sm:px-6 lg:left-1/5 lg:px-0 bg-[#F6F2E9] rounded-3xl max-w-xs sm:max-w-lg lg:max-w-2xl p-4 sm:p-6 lg:p-8 shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)] lg:shadow-none">
        <p className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] leading-tight">
          <span className="text-[#000000]">FOOD</span>
          <span className="text-[#717B84]">IARY</span>
        </p>
        <p className="text-[#717B84] font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[32px] pb-4 sm:pb-6 lg:pb-10 leading-tight">
          Zdrowie zaczyna się na talerzu
        </p>
        <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[23px] pb-4 sm:pb-6 lg:pb-8 leading-relaxed">
          Zacznij jeść świadomie – twórz spersonalizowane jadłospisy, kontroluj
          kalorie i odkryj, jak łatwe może być zdrowe odżywianie.
        </p>
        <Link to="/register" className="w-full sm:w-auto">
          <button className="bg-[#091B2B] text-white py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-10 rounded-[40px] text-sm sm:text-base lg:text-[16px] font-semibold drop-shadow-2xl hover:shadow-xl transition-all cursor-pointer w-full sm:w-auto">
            DOŁĄCZ TERAZ!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
