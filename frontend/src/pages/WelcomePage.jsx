import React from "react";
import NavbarNotAuth from "../components/NavbarNotAuth";
import WelcomePageBackground from "../components/WelcomePageBackground";

const WelcomePage = () => {
    return (
    <div className='bg-[#F6F2E9] h-screen w-screen m-0 p-0'>
        <WelcomePageBackground />
        <img src="/welcomepage/plate.png" className="absolute bottom-0 right-0 scale-85 origin-bottom-right" alt="plate"/>
        <NavbarNotAuth />
        <div className="flex flex-col items-start absolute top-1/4 left-1/4">
        <p className="font-extrabold text-[70px]">
          <span className='text-[#000000]'>FOOD</span><span className='text-[#717B84]'>IARY</span>
        </p>
        <p className="text-[#717B84] font-extrabold text-[32px] pb-10">Zdrowie zaczyna się na talerzu</p>
        <p className="font-semibold text-[24px] w-2xl pb-8">Zacznij jeść świadomie – twórz spersonalizowane jadłospisy, kontroluj kalorie i odkryj, jak łatwe może być zdrowe odżywianie.</p>
        <button className="bg-[#091B2B] self-center text-white py-5 px-10 rounded-[40px] text-[16px] font-semibold drop-shadow-2xl hover:shadow-xl transition-all">
        DOŁĄCZ TERAZ!
        </button>
      </div>
    </div>
    );
}

export default WelcomePage;