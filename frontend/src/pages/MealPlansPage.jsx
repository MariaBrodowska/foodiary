import React, {useState, useEffect} from "react";
import NavbarAuth from "../components/NavbarAuth";
import Logo2 from "../components/Logo2";
import { Link } from "react-router-dom";

const BackgroundImages = () => (
    <>
      {/* <img
        src="dashboardpage/blue-ellipse.png"
        alt="blue ellipse"
        className="absolute right-0 top-0 scale-90 origin-bottom-right z-0 pointer-events-none select-none"
      /> */}
      <img
        src="dashboardpage/green-ellipse.png"
        alt="green ellipse"
        className="absolute top-0 right-0 lg:scale-90 scale-84 origin-top-right z-0 pointer-events-none select-none"
      />
    </>
);

const dietPlans = [
  {
    name: 'Keto Plan Dzienny',
    description: 'Niskowęglowodanowy plan diety bogaty w tłuszcze.',
    calories: 1500,
    liked: false,
  },
  {
    name: 'Dieta Wysokobłonnikowa',
    description: 'Dieta bogata w błonnik, idealna dla osób dbających o trawienie.',
    calories: 1800,
    liked: true,
  },
  {
    name: 'Niskokaloryczny plan',
    description: 'Dieta niskokaloryczna, idealna dla osób chcących schudnąć.',
    calories: 1200,
    liked: false,
  }
];

const DietPlansSection = () => {
  return (
    <main className="relative mt-30 z-10 bg-[#EDEDED] py-10 px-20 max-w-7xl mx-auto rounded-2xl shadow-2xl">
      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="diet-name" className="text-gray-700 font-semibold">Szukaj diety:</label>
            <input
              id="diet-name"
              name="diet-name"
              type="text"
              placeholder="Szukaj po nazwie diety..."
              className="border-[#858585] border bg-white rounded-xl px-4 py-3 w-full mt-2 text-[13px]"
            />
          </div>
          <div>
            <label htmlFor="diet-type" className="text-gray-700 font-semibold">Typ diety:</label>
            <select
              id="diet-type"
              name="diet-type"
              className="border-[#858585] border bg-white rounded-xl px-4 py-3.5 w-full mt-2 text-[13px]"
            >
              <option>Wszystkie diety</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label htmlFor="min-cal" className="text-gray-700 font-semibold">Kalorie (od)</label>
            <input
              id="min-cal"
              type="number"
              placeholder="Min"
              className="border-[#858585] border bg-white rounded-xl px-4 py-3 w-full mt-2 text-[13px]"
            />
          </div>
          <div>
            <label htmlFor="max-cal" className="text-gray-700 font-semibold">Kalorie (do)</label>
            <input
              id="max-cal"
              type="number"
              placeholder="Max"
              className="border-[#858585] border bg-white rounded-xl px-4 py-3 w-full mt-2 text-[13px]"
            />
          </div>
          <div className="flex items-end">
            <button className="bg-[#EFBD4C] hover:bg-yellow-500 text-black rounded-3xl px-2 py-3 w-full font-semibold text-[13px] mt-6">
              SZUKAJ PLANÓW
            </button>
          </div>
        </div>
        <hr className="my-8 border-t border-gray-300 border-2"/>
      </div>

      <div className="space-y-6">
        {dietPlans.map((plan, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg h-40 p-6 flex justify-between items-center relative">
            <div className="flex flex-col justify-start h-full">
              <h3 className="font-bold text-xl">{plan.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
            </div>
            <div className="flex flex-col items-end justify-end h-full">
              <p className="text-[#FFC440] font-semibold mb-2">Kalorie: {plan.calories} kcal</p>
              <button className="bg-[#EFBD4C] hover:bg-yellow-500 text-black px-7 py-2 rounded-3xl text-sm font-semibold text-[10px] ">
                ZOBACZ SZCZEGÓŁY
              </button>
            </div>
            <div className="absolute top-3 right-4 text-xl">
              {plan.liked ? (
                <span className="text-red-500">❤️</span>
              ) : (
                <span className="text-black">🖤</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

const MealPlansPage = () => {
    return (
        <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center overflow-x-hidden">
        <Logo2 />
          
        <div className="absolute top-0 left-0 w-full z-10">
        <NavbarAuth />
        </div>
          
          <div className="relative w-full pb-10">
            <BackgroundImages />
            
            <div className="relative w-full flex justify-center mb-16">
              <DietPlansSection />
            </div>
          </div>
        </div>
    );
};

export default MealPlansPage;
