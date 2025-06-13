import React, { useState, useEffect } from "react";
import NavbarAuth from "../components/nav/NavbarAuth";
import Logo2 from "../components/common/Logo2";
import MealPlansList from "../components/mealplans/MealPlansList";
import IngredientSelector from "../components/mealplans/IngredientSelector";
import { useSearchParams } from "react-router-dom";

const BackgroundImages = () => (
  <>
    <img
      src="dashboardpage/green-ellipse.png"
      alt="green ellipse"
      className="absolute top-0 right-0 lg:scale-90 scale-84 origin-top-right z-0 pointer-events-none select-none"
    />
  </>
);

const DietPlansSection = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    dietType: "",
    calories: "",
    ingredients: [],
  });
  const [appliedFilters, setAppliedFilters] = useState({
    dietType: "",
    calories: 2000,
    ingredients: [],
  });

  useEffect(() => {
    const dietFromUrl = searchParams.get("diet");
    if (dietFromUrl) {
      setFilters((prev) => ({
        ...prev,
        dietType: dietFromUrl,
      }));
      setAppliedFilters((prev) => ({
        ...prev,
        dietType: dietFromUrl,
      }));
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredientsChange = (ingredients) => {
    setFilters((prev) => ({
      ...prev,
      ingredients: ingredients,
    }));
  };

  const handleSearch = () => {
    var caloriesValue = parseInt(filters.calories);
    if (isNaN(caloriesValue) || caloriesValue <= 0) {
      caloriesValue = 2000;
    }
    setAppliedFilters({
      dietType: filters.dietType,
      calories: caloriesValue,
      ingredients: filters.ingredients,
    });
  };

  return (
    <main className="relative mt-20 sm:mt-24 lg:mt-30 z-10 bg-[#EDEDED] py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-12 xl:px-20 max-w-full sm:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto rounded-2xl shadow-2xl">
      <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div>
            <label
              htmlFor="diet-type"
              className="block text-gray-700 font-semibold text-sm sm:text-base mb-2"
            >
              Typ diety:
            </label>
            <select
              id="diet-type"
              name="dietType"
              value={filters.dietType}
              onChange={handleInputChange}
              className="border-[#858585] border bg-white rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 w-full text-xs sm:text-sm lg:text-[13px]"
            >
              <option value="">Wszystkie diety</option>
              <option value="vegetarian">Wegetariańska</option>
              <option value="vegan">Wegańska</option>
              <option value="ketogenic">Ketogeniczna</option>
              <option value="paleo">Paleo</option>
              <option value="gluten free">Bezglutenowa</option>
              <option value="pescetarian">Pescetariańska</option>
              <option value="primal">Pierwotna</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="calories"
              className="block text-gray-700 font-semibold text-sm sm:text-base mb-2"
            >
              Kalorie dziennie
            </label>
            <input
              id="calories"
              name="calories"
              type="number"
              placeholder="np. 2000"
              value={filters.calories}
              onChange={handleInputChange}
              className="border-[#858585] border bg-white rounded-xl px-3 sm:px-4 py-3 w-full text-xs sm:text-sm lg:text-[13px]"
            />
          </div>
        </div>
        <div className="w-full">
          <IngredientSelector
            selectedIngredients={filters.ingredients}
            onIngredientsChange={handleIngredientsChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSearch}
            className="bg-[#EFBD4C] hover:bg-yellow-500 text-black rounded-3xl px-6 sm:px-8 py-3 font-semibold text-xs sm:text-sm lg:text-[13px] w-full sm:w-auto max-w-xs"
          >
            SZUKAJ PLANÓW
          </button>
        </div>
        <hr className="my-6 sm:my-8 border-t border-gray-300 border-2" />
      </div>
      <MealPlansList
        targetCalories={appliedFilters.calories}
        diet={appliedFilters.dietType}
        ingredients={appliedFilters.ingredients}
      />
    </main>
  );
};

const MealPlansPage = () => {
  return (
    <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <Logo2 />

      <div className="absolute top-0 left-0 w-full z-20">
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
