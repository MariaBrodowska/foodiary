import React from "react";
import NavbarAuth from "../components/nav/NavbarAuth";
import Logo2 from "../components/common/Logo2";
import { Link } from "react-router-dom";
import useUserData from "../hooks/useUserData";

const imagesPath = "/dashboardpage";

const BackgroundImages = () => (
  <>
    <img
      src={`${imagesPath}/blue-ellipse.png`}
      alt="blue ellipse"
      className="absolute right-0 top-0 scale-50 sm:scale-75 lg:scale-90 origin-bottom-right z-0 pointer-events-none select-none"
    />
    <img
      src={`${imagesPath}/green-ellipse.png`}
      alt="green ellipse"
      className="absolute top-0 right-0 scale-50 sm:scale-75 lg:scale-90 origin-top-right z-0 pointer-events-none select-none"
    />
    <img
      src={`${imagesPath}/blueberries.png`}
      alt="blueberries"
      className="absolute top-12 sm:top-16 lg:top-24 left-0 scale-50 sm:scale-70 lg:scale-85 origin-top-left z-0 pointer-events-none select-none"
    />
  </>
);

const PlanSection = () => (
  <div className="relative mt-8 sm:mt-16 lg:mt-70 px-4 sm:px-8 lg:ml-60 lg:px-4 flex flex-col items-center z-10 w-full lg:w-auto">
    <div className="bg-white rounded-[20px] sm:mt-20 lg:mt-0 sm:rounded-[30px] px-6 sm:px-10 lg:px-14 py-6 sm:py-8 lg:py-10 shadow-[0px_4px_30px_10px_rgba(0,0,0,0.15)] space-y-3 sm:space-y-5 max-w-xs sm:max-w-2xl lg:max-w-3xl text-center w-full">
      <p className="text-black font-bold text-xl sm:text-2xl lg:text-[42px] max-w-md mx-auto leading-tight">
        Zaplanuj zdrowie na cały tydzień
      </p>
      <p className="font-semibold text-sm sm:text-lg lg:text-[22px] text-[#717B84] leading-relaxed">
        Śledź swoje posiłki, obliczaj dzienne zapotrzebowanie kaloryczne i
        generuj listy zakupów na cały tydzień! Twórz spersonalizowane jadłospisy
        lub skorzystaj z naszych gotowych propozycji.
      </p>
    </div>
    <Link to="/myplans" className="w-full sm:w-auto">
      <button className="bg-[#EFBD4C] text-black py-3 sm:py-4 px-8 sm:px-12 mt-6 sm:mt-8 lg:mt-10 rounded-[40px] text-sm sm:text-[16px] font-semibold drop-shadow-2xl hover:shadow-xl transition-all cursor-pointer w-full sm:w-auto">
        STWÓRZ NOWĄ DIETĘ!
      </button>
    </Link>
  </div>
);

const WaterSection = ({ userData }) => {
  const waterAmount = userData?.additionalData?.waterIntake
    ? (userData.additionalData.waterIntake / 1000).toFixed(1)
    : "2,6";

  return (
    <div className="relative z-10 w-full lg:max-w-md lg:ml-auto px-4 sm:px-6 lg:pr-10 pt-8 sm:pt-12 lg:pt-20 mt-8 sm:mt-16 lg:mt-40 text-center text-white flex flex-col items-center">
      <p className="text-xl sm:text-3xl lg:text-[42px] font-bold leading-tigh bg-[#091B2B] rounded-3xl py-2 px-5">
        Pamiętaj o nawodnieniu!
      </p>
      <img
        src={`${imagesPath}/water.png`}
        alt="water"
        className="my-6 sm:my-8 lg:my-10 h-[200px] w-[150px] sm:h-[280px] sm:w-[210px] lg:h-[360px] lg:w-[270px]"
      />
      <p className="text-sm sm:text-lg lg:text-[24px] font-semibold sm:px-5 leading-relaxed bg-[#091B2B] rounded-3xl py-2 px-5">
        Przy twojej wadze, codzienne zapotrzebowanie na wodę wynosi około
      </p>
      <p
        className="text-2xl sm:text-4xl lg:text-[54px] font-semibold bg-[#091B2B] rounded-3xl py-2 px-5"
        id="waterAmount"
      >
        {waterAmount} litrów.
      </p>
    </div>
  );
};

const StatsCard = ({ icon, title, value }) => (
  <div className="relative bg-white rounded-xl shadow-xl px-4 sm:px-8 lg:px-10 py-6 sm:py-8 text-center w-full sm:w-[220px] lg:w-[260px] h-[140px] sm:h-[160px] lg:h-[180px]">
    <div className="absolute -top-8 sm:-top-12 lg:-top-16 left-1/2 transform -translate-x-1/2">
      <img
        src={`${imagesPath}/${icon}.png`}
        alt={icon}
        className="w-12 h-12 sm:w-16 sm:h-16 lg:w-auto lg:h-auto"
      />
    </div>
    <p className="mt-6 sm:mt-8 lg:mt-10 text-xs sm:text-sm font-bold text-gray-700 leading-tight">
      {title}
    </p>
    <p className="text-lg sm:text-xl lg:text-2xl font-extrabold text-black">
      {value}
    </p>
  </div>
);

const StatsSection = ({ userData }) => {
  const getActivityText = (activity) => {
    switch (activity) {
      case "high":
        return "wysoka";
      case "moderate":
        return "umiarkowana";
      case "low":
        return "niska";
      default:
        return "umiarkowana";
    }
  };

  const currentCalories = userData?.additionalData?.tdee
    ? Math.round(userData.additionalData.tdee)
    : "-";

  const targetCalories = userData?.additionalData?.targetCalories
    ? Math.round(userData.additionalData.targetCalories)
    : "-";

  const activityText = userData?.activity
    ? getActivityText(userData.activity)
    : "-";

  return (
    <div className="relative w-full mb-8 sm:mb-12 lg:mb-20 mt-8 sm:mt-16 lg:mt-70 px-4 pt-8 lg:mr-50">
      <img
        src={`${imagesPath}/yellow-ellipse.png`}
        alt="yellow ellipse"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      />

      <div className="relative z-10 flex flex-col sm:flex-row justify-center sm:justify-evenly flex-wrap gap-4 sm:gap-6 py-8 sm:py-12 lg:pl-50">
        <StatsCard
          icon="apple"
          title="Twoje obecne zapotrzebowanie"
          value={`${currentCalories} kcal`}
        />
        <StatsCard
          icon="weights"
          title="Twój cel"
          value={`${targetCalories} kcal`}
        />
        <StatsCard
          icon="activity"
          title="Twoja aktywność fizyczna"
          value={activityText}
        />
      </div>
    </div>
  );
};

const DietCard = ({ dietType, dietName, description, icon }) => (
  <Link to={`/mealplans?diet=${dietType}`}>
    <div className="bg-white rounded-xl shadow-lg px-4 sm:px-6 py-6 sm:py-8 text-center hover:shadow-xl transition-all cursor-pointer hover:scale-105 transform duration-200 h-full">
      <div className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2">
        {dietName}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  </Link>
);

const Diets = () => {
  const diets = [
    {
      dietType: "vegetarian",
      dietName: "Wegetariańska",
      description: "Bogata w warzywa, owoce i produkty roślinne",
      icon: "🥗",
    },
    {
      dietType: "vegan",
      dietName: "Wegańska",
      description: "W pełni roślinna, bez produktów pochodzenia zwierzęcego",
      icon: "🌱",
    },
    {
      dietType: "ketogenic",
      dietName: "Ketogeniczna",
      description: "Nisko węglowodanowa, wysokotłuszczowa",
      icon: "🥑",
    },
    {
      dietType: "paleo",
      dietName: "Paleo",
      description: "Oparta na produktach dostępnych w epoce paleolitu",
      icon: "🥩",
    },
    {
      dietType: "gluten free",
      dietName: "Bezglutenowa",
      description:
        "Bez glutenu, bezpieczna dla osób z nadwrażliwością na gluten",
      icon: "🌾",
    },
    {
      dietType: "pescetarian",
      dietName: "Pescetariańska",
      description: "Wegetariańska z dodatkiem ryb i owoców morza",
      icon: "🐟",
    },
    {
      dietType: "primal",
      dietName: "Pierwotna",
      description: "Naturalne, nieprzetworzone produkty",
      icon: "🍯",
    },
  ];

  return (
    <>
      <div className="relative bg-[#EFBD4C] mt-8 sm:mt-12 lg:mt-20 h-2 w-full"></div>
      <div className="relative w-full bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-[36px] text-gray-800 mb-3 sm:mb-4">
              Dostępne rodzaje diet
            </h2>
            <p className="text-sm sm:text-lg lg:text-[20px] text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Wybierz rodzaj diety, który najbardziej odpowiada Twoim potrzebom
              i preferencjom żywieniowym
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {diets.map((diet) => (
              <DietCard
                key={diet.dietType}
                dietType={diet.dietType}
                dietName={diet.dietName}
                description={diet.description}
                icon={diet.icon}
              />
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <Link to="/mealplans">
              <button className="bg-[#EFBD4C] hover:bg-yellow-500 text-black py-3 sm:py-4 px-6 sm:px-8 rounded-[40px] text-sm sm:text-[16px] font-semibold drop-shadow-lg hover:shadow-xl transition-all w-full sm:w-auto max-w-xs sm:max-w-none">
                ZOBACZ WSZYSTKIE PLANY
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative bg-[#EFBD4C] h-2 w-full"></div>
    </>
  );
};

const DashboardPage = () => {
  const { userData, loading, error } = useUserData();

  if (loading) {
    return (
      <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center justify-center px-4">
        <p className="text-lg sm:text-xl text-center">
          Ładowanie danych użytkownika...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center justify-center px-4">
        <p className="text-lg sm:text-xl text-red-500 text-center">
          Błąd: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <Logo2 />

      <div className="absolute top-0 left-0 w-full z-20">
        <NavbarAuth />
      </div>

      <div className="relative w-full">
        <BackgroundImages />

        <div className="relative w-full flex flex-col lg:flex-row lg:justify-end">
          <PlanSection />
          <WaterSection userData={userData} />
        </div>
      </div>

      <StatsSection userData={userData} />

      <Diets />
    </div>
  );
};

export default DashboardPage;
