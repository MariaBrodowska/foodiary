import React from "react";
import NavbarAuth from "../components/NavbarAuth";
import Logo2 from "../components/Logo2";
import { Link } from "react-router-dom";
import useUserData from "../hooks/useUserData";

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
        Śledź swoje posiłki, obliczaj dzienne zapotrzebowanie kaloryczne i
        generuj listy zakupów na cały tydzień! Twórz spersonalizowane jadłospisy
        lub skorzystaj z naszych gotowych propozycji.
      </p>
    </div>
    <Link to="/myplans">
      <button className="bg-[#EFBD4C] text-black py-4 px-12 mt-10 rounded-[40px] text-[16px] font-semibold drop-shadow-2xl hover:shadow-xl transition-all cursor-pointer">
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
    <div className="relative z-10 max-w-md ml-auto pr-10 pt-20 mt-40 text-center text-white flex flex-col items-center">
      <p className="text-[42px] font-bold">Pamiętaj o nawodnieniu!</p>
      <img
        src={`${imagesPath}/water.png`}
        alt="water"
        className="my-10 h-[360px] w-[270px]"
      />
      <p className="text-[24px] font-semibold px-5">
        Przy twojej wadze, codzienne zapotrzebowanie na wodę wynosi około
      </p>
      <p className="text-[54px] font-semibold" id="waterAmount">
        {waterAmount} litrów.
      </p>
    </div>
  );
};

const StatsCard = ({ icon, title, value }) => (
  <div className="relative bg-white rounded-xl shadow-xl px-10 py-8 text-center w-[260px] h-[180px]">
    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
      <img src={`${imagesPath}/${icon}.png`} alt={icon} />
    </div>
    <p className="mt-10 text-sm font-bold text-gray-700">{title}</p>
    <p className="text-2xl font-extrabold text-black">{value}</p>
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
    <div className="bg-white rounded-xl shadow-lg px-6 py-8 text-center hover:shadow-xl transition-all cursor-pointer hover:scale-105 transform duration-200">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-lg text-gray-800 mb-2">{dietName}</h3>
      <p className="text-sm text-gray-600">{description}</p>
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
    <div className="relative w-full bg-white py-16 px-8 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold text-[36px] text-gray-800 mb-4">
            Dostępne rodzaje diet
          </h2>
          <p className="text-[20px] text-gray-600 max-w-3xl mx-auto">
            Wybierz rodzaj diety, który najbardziej odpowiada Twoim potrzebom i
            preferencjom żywieniowym
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

        <div className="text-center mt-12">
          <Link to="/mealplans">
            <button className="bg-[#EFBD4C] hover:bg-yellow-500 text-black py-4 px-8 rounded-[40px] text-[16px] font-semibold drop-shadow-lg hover:shadow-xl transition-all">
              ZOBACZ WSZYSTKIE PLANY
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { userData, loading, error } = useUserData();

  if (loading) {
    return (
      <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center justify-center">
        <p className="text-xl">Ładowanie danych użytkownika...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center justify-center">
        <p className="text-xl text-red-500">Błąd: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <Logo2 />
      <div className="fixed top-0 left-0 w-full z-[100]">
        <NavbarAuth />
      </div>

      <div className="relative w-full">
        <BackgroundImages />

        <div className="relative w-full flex justify-end">
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
