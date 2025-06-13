import React from "react";
import NavbarNotAuth from "../components/nav/NavbarNotAuth";
import WelcomePageBackground from "../components/common/WelcomePageBackground";
import Logo1 from "../components/common/Logo1";
import { Link } from "react-router-dom";

const SamplePlans = () => {
  return (
    <div className="bg-[#F6F2E9] min-h-screen w-full relative flex justify-center items-center overflow-x-hidden">
      <WelcomePageBackground />
      <NavbarNotAuth />
      <Logo1 />

      <div className="flex flex-col relative mt-15 rounded-3xl w-fit mx-15 items-center">
        <div className="bg-white rounded-[30px] shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)] max-w-5xl py-5 px-10 2xl:bg-transparent 2xl:shadow-none">
          <p className="text-black font-extrabold lg:text-[36px] sm:text-[28px] pb-3 text-center">
            Wypróbuj nasze przykładowe jadłospisy
          </p>
          <p className="font-semibold text-[18px] pb-8 text-[#717B84] text-center">
            Sprawdź przykładowe plany żywieniowe na cały dzień — zbilansowane,
            smaczne i dopasowane kalorycznie. Zaloguj się, by otrzymać więcej
            propozycji i możliwość personalizacji!
          </p>
        </div>
        <div className="flex text-black justify-between mt-7">
          <div className="bg-white rounded-[30px] px-10 py-13 shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)] space-y-4 mr-25">
            <p className="font-semibold text-[22px]">Plan 1 - 2000 kcal</p>
            <p className="font-regular text-[16px] flex">
              <p className="font-semibold mr-1">Śniadanie:</p>Jajecznica z
              warzywami i chlebem żytnim – 600 kcal
            </p>
            <p className="font-regular text-[16px] flex">
              <p className="font-semibold mr-1">Obiad:</p>Indyk w sosie
              jogurtowym + ziemniaki i sałatka – 900 kcal
            </p>
            <p className="font-regular text-[16px] flex">
              <p className="font-semibold mr-1">Kolacja:</p>Koktajl proteinowy z
              owocami – 500 kcal
            </p>
          </div>
          <div className="bg-white rounded-[30px] px-10 py-13 shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)] space-y-4">
            <p className="font-semibold text-[22px]">Plan 2 - 1800 kcal</p>
            <p className="font-regular text-[16px] flex">
              <span className="font-semibold mr-1">Śniadanie:</span>
              Owsianka z owocami i orzechami – 500 kcal
            </p>
            <p className="font-regular text-[16px] flex">
              <span className="font-semibold mr-1">Obiad:</span>
              Kurczak pieczony z kaszą bulgur i brokułami – 800 kcal
            </p>
            <p className="font-regular text-[16px] flex">
              <span className="font-semibold mr-1">Kolacja:</span>
              Sałatka z tuńczykiem, jajkiem i warzywami – 500 kcal
            </p>
          </div>
        </div>
        <div className="bg-white rounded-[20px] shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)] font-regular text-[16px] text-center px-10 py-3 mt-10 mb-5 flex">
          Aby zobaczyć więcej planów i zapisać swoje ulubione
          <p className="font-semibold ml-1">— załóż konto!</p>
        </div>
        <Link to="/register">
          <button className="bg-[#EFBD4C] self-center text-black py-4 px-12 rounded-[40px] text-[16px] font-semibold drop-shadow-2xl hover:shadow-xl transition-all cursor-pointer">
            DOŁĄCZ TERAZ!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SamplePlans;
