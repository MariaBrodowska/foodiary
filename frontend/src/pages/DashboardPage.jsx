import React from "react";
import NavbarAuth from "../components/NavbarAuth";
import Logo2 from "../components/Logo2";
import { Link } from "react-router-dom";

const imagesPath = "/dashboardpage";

const BackgroundImages = () => (
    <>
      <img
        src={`${imagesPath}/blue-ellipse.png`}
        alt="blue ellipse"
        className="absolute right-0 top-0 scale-90 origin-bottom-right z-0 pointer-events-none select-none"
      />
      <img
        src={`${imagesPath}/green-ellipse.png`}
        alt="green ellipse"
        className="absolute top-0 right-0 lg:scale-90 scale-75 origin-top-right z-0 pointer-events-none select-none"
      />
      <img
        src={`${imagesPath}/blueberries.png`}
        alt="blueberries"
        className="absolute top-24 left-0 lg:scale-85 scale-70 origin-top-left z-0 pointer-events-none select-none"
      />
    </>
);

const PlanSection = () => (
    <div className="relative mt-70 ml-60 px-4 flex flex-col items-center z-10">
      <div className="bg-white rounded-[30px] px-14 py-10 shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)] space-y-5 max-w-3xl text-center">
        <p className="text-black font-bold lg:text-[42px] max-w-md mx-auto">
          Zaplanuj zdrowie na cały tydzień
        </p>
        <p className="font-semibold text-[22px] text-[#717B84]">
          Śledź swoje posiłki, obliczaj dzienne zapotrzebowanie kaloryczne i generuj listy zakupów na cały tydzień! Twórz spersonalizowane jadłospisy lub skorzystaj z naszych gotowych propozycji.
        </p>
      </div>
      <Link to="/myplans">
        <button className="bg-[#EFBD4C] text-black py-4 px-12 mt-10 rounded-[40px] text-[16px] font-semibold drop-shadow-2xl hover:shadow-xl transition-all cursor-pointer">
          STWÓRZ NOWĄ DIETĘ!
        </button>
      </Link>
    </div>
);

const WaterSection = () => (
    <div className="relative z-10 max-w-md ml-auto pr-10 pt-20 mt-40 text-center text-white flex flex-col items-center">
      <p className="text-[42px] font-bold">Pamiętaj o nawodnieniu!</p>
      <img src={`${imagesPath}/water.png`} alt="water" className="my-10 h-[360px] w-[270px]" />
      <p className="text-[24px] font-semibold px-5">
        Przy twojej wadze, codzienne zapotrzebowanie na wodę wynosi około
      </p>
      <p className="text-[54px] font-semibold" id="waterAmount">
        2,6 litrów.
      </p>
    </div>
  );

  const StatsCard = ({ icon, title, value }) => (
    <div className="relative bg-white rounded-xl shadow-xl px-10 py-8 text-center w-[260px] h-[180px]">
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
        <img src={`${imagesPath}/${icon}.png`} alt={icon} />
      </div>
      <p className="mt-10 text-sm font-bold text-gray-700">{title}</p>
      <p className="text-2xl font-extrabold text-black">{value}</p>
    </div>
  );

  const StatsSection = () => (
  <div className="relative w-full mb-20 mt-70 px-4 pt-8 mr-50">
    <img
      src={`${imagesPath}/yellow-ellipse.png`}
      alt="yellow ellipse"
      className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
    />

    <div className="relative z-10 flex justify-evenly flex-wrap gap-6 py-12 pl-50">
      <StatsCard 
        icon="apple" 
        title="Twoje obecne zapotrzebowanie" 
        value="2100 kcal" 
      />
      <StatsCard 
        icon="weights" 
        title="Twój cel" 
        value="2300 kcal" 
      />
      <StatsCard 
        icon="activity" 
        title="Twoja aktywność fizyczna" 
        value="umiarkowana" 
      />
    </div>
  </div>
);


const DashboardPage = () => {
    return (
        <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center overflow-x-hidden">
        <Logo2 />
        
        <div className="relative w-full">
          <BackgroundImages />
          
          <div className="relative w-full flex justify-end">
            <PlanSection />
            <WaterSection />
          </div>
        </div>
        
        <StatsSection />
        
        <NavbarAuth />
        
        <p className="font-bold text-[32px] py-10">Zobacz nasze jadłospisy</p>
      </div>
    );
};

export default DashboardPage;
