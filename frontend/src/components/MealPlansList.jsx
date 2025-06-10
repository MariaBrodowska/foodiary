import React, { useEffect, useState } from "react";
import axios from "axios";
import { translateIngredients } from "../data/ingredients";

const MealPlansList = ({ targetCalories, diet, ingredients }) => {
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [likedMeals, setLikedMeals] = useState(new Set());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const plansPerPage = 6;

  useEffect(() => {
    const fetchMealPlans = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseParams = {
          timeFrame: "day",
          targetCalories: targetCalories,
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
        };

        if (diet) {
          baseParams.diet = diet;
        }

        if (ingredients && ingredients.length > 0) {
          const translatedIngredients = translateIngredients(ingredients);
          baseParams.includeIngredients = translatedIngredients;
        }

        const promises = Array.from({ length: 7 }, (_, index) =>
          axios
            .get("https://api.spoonacular.com/mealplanner/generate", {
              params: baseParams,
            })
            .then((response) => ({
              id: index + 1,
              name: `Jadłospis ${index + 1}`,
              description:
                ingredients && ingredients.length > 0
                  ? `Plan żywieniowy ${index + 1} - ${
                      diet || "ogólny"
                    } (ze składnikami: ${ingredients.join(", ")})`
                  : `Plan żywieniowy ${index + 1} - ${diet || "ogólny"}`,
              meals: response.data.meals,
              nutrients: response.data.nutrients,
            }))
        );
        const plans = await Promise.all(promises);
        setMealPlans(plans);
      } catch (err) {
        console.error("Błąd pobierania danych z API:", err);
        setError("Nie można pobrać planów żywieniowych.");
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlans();
    setCurrentPage(1);
  }, [targetCalories, diet, ingredients]);

  const toggleLike = (mealId) => {
    setLikedMeals((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(mealId)) {
        newLiked.delete(mealId);
      } else {
        newLiked.add(mealId);
      }
      return newLiked;
    });
  };

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const showMealDetails = (meal) => {
    setSelectedMeal(meal);
  };

  const hideMealDetails = () => {
    setSelectedMeal(null);
  };

  const backToPlans = () => {
    setSelectedPlan(null);
    setSelectedMeal(null);
  };

  const totalPages = Math.ceil(mealPlans.length / plansPerPage);
  const startIndex = (currentPage - 1) * plansPerPage;
  const endIndex = startIndex + plansPerPage;
  const currentPlans = mealPlans.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return <div className="text-center py-8">Ładowanie planów...</div>;

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-3xl"
        >
          Spróbuj ponownie
        </button>
      </div>
    );
  }

  if (!mealPlans || mealPlans.length === 0)
    return <div className="text-center py-8">Brak danych do wyświetlenia</div>;

  if (selectedMeal) {
    return (
      <div className="p-4">
        <button
          onClick={hideMealDetails}
          className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Powrót do jadłospisu
        </button>

        <div className="mb-6">
          <img
            src={`https://spoonacular.com/recipeImages/${selectedMeal.image}`}
            alt={selectedMeal.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        <h2 className="text-2xl font-bold mb-4">{selectedMeal.title}</h2>
        <p>Czas przygotowania: {selectedMeal.readyInMinutes} min</p>
        <a
          href={selectedMeal.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 block mb-4"
        >
          Zobacz przepis
        </a>
        <div className="mt-6">
          <h3 className="text-lg font-bold">Podsumowanie odżywcze:</h3>
          <p>Kalorie: {selectedPlan?.nutrients?.calories} kcal (cały dzień)</p>
          <p>Białko: {selectedPlan?.nutrients?.protein}g</p>
          <p>Tłuszcz: {selectedPlan?.nutrients?.fat}g</p>
          <p>Węglowodany: {selectedPlan?.nutrients?.carbohydrates}g</p>
        </div>
      </div>
    );
  }

  if (selectedPlan) {
    const mealTypes = ["Śniadanie", "Obiad", "Kolacja"];

    return (
      <div className="p-4">
        <button
          onClick={backToPlans}
          className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Powrót do listy jadłospisów
        </button>
        <h2 className="text-2xl font-bold mb-6">{selectedPlan.name}</h2>
        <div className="space-y-6">
          {selectedPlan.meals.map((meal, idx) => (
            <div
              key={meal.id}
              className="bg-white shadow rounded-lg p-6 flex items-center relative overflow-hidden"
              style={{ minHeight: "160px" }}
            >
              <div className="w-32 h-32 flex-shrink-0 mr-6">
                <img
                  src={`https://spoonacular.com/recipeImages/${meal.image}`}
                  alt={meal.title}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = "/placeholder-food.jpg";
                    e.target.onerror = null;
                  }}
                />
              </div>

              <div className="flex flex-col justify-start flex-grow">
                <h3 className="font-bold text-xl">{meal.title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Czas przygotowania: {meal.readyInMinutes} min
                </p>
              </div>

              <div className="flex flex-col items-end justify-end">
                <p className="text-[#FFC440] font-semibold mb-2">
                  {mealTypes[idx] || `Posiłek ${idx + 1}`}
                </p>
                <button
                  onClick={() => showMealDetails(meal)}
                  className="bg-[#EFBD4C] hover:bg-yellow-500 text-black px-7 py-2 rounded-3xl text-sm font-semibold text-[10px]"
                >
                  ZOBACZ SZCZEGÓŁY
                </button>
              </div>

              <div
                className="absolute top-3 right-4 text-xl cursor-pointer"
                onClick={() => toggleLike(meal.id)}
              >
                {likedMeals.has(meal.id) ? (
                  <span className="text-red-500">❤️</span>
                ) : (
                  <span className="text-black">🖤</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Podsumowanie dnia:</h3>
          <p>Łączne kalorie: {selectedPlan.nutrients.calories} kcal</p>
          <p>Białko: {selectedPlan.nutrients.protein}g</p>
          <p>Tłuszcz: {selectedPlan.nutrients.fat}g</p>
          <p>Węglowodany: {selectedPlan.nutrients.carbohydrates}g</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Dostępne Jadłospisy</h2>
      <p className="text-gray-600 mb-6">
        Wybierz jadłospis, który Cię interesuje - {targetCalories} kcal, dieta:{" "}
        {diet}
      </p>

      <div className="mb-4 text-sm text-gray-500">
        Znaleziono {mealPlans.length} jadłospisów. Strona {currentPage} z{" "}
        {totalPages}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {currentPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white shadow rounded-lg p-6 flex justify-between items-center hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => selectPlan(plan)}
          >
            <div className="flex items-center">
              <div className="w-16 h-16 flex-shrink-0 mr-4">
                <img
                  src={`https://spoonacular.com/recipeImages/${plan.meals[0]?.image}`}
                  alt={plan.meals[0]?.title}
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              <div className="flex flex-col">
                <h3 className="font-bold text-xl text-[#FFC440]">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mt-2">{plan.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {plan.nutrients.calories} kcal
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <button className="bg-[#EFBD4C] hover:bg-yellow-500 text-black mx-4 px-4 py-3 rounded-3xl font-semibold text-md">
                ZOBACZ JADŁOSPIS
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#EFBD4C] hover:bg-yellow-500 text-black"
            }`}
          >
            ← Poprzednia
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-[#FFC440] text-black font-semibold"
                  : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#EFBD4C] hover:bg-yellow-500 text-black"
            }`}
          >
            Następna →
          </button>
        </div>
      )}
    </div>
  );
};

export default MealPlansList;
