import React from "react";
import NavbarAuth from "../components/NavbarAuth";
import Logo2 from "../components/Logo2";
import useLikedPlans from "../hooks/useLikedPlans";

const BackgroundImages = () => (
  <>
    <img
      src="dashboardpage/green-ellipse.png"
      alt="green ellipse"
      className="absolute top-0 right-0 lg:scale-90 scale-84 origin-top-right z-0 pointer-events-none select-none"
    />
  </>
);

const FavoritePlansSection = () => {
  const { likedPlans, toggleLike } = useLikedPlans();
  const error = null;

  const handleRemoveFromFavorites = async (planId, planName) => {
    if (
      window.confirm(`Czy na pewno chcesz usunąć "${planName}" z ulubionych?`)
    ) {
      try {
        await toggleLike(planId);
        const successMessage = document.createElement("div");
        successMessage.className =
          "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
        successMessage.textContent = "Plan usunięty z ulubionych!";
        document.body.appendChild(successMessage);

        setTimeout(() => {
          document.body.removeChild(successMessage);
        }, 3000);
      } catch (error) {
        const errorMessage = document.createElement("div");
        errorMessage.className =
          "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
        errorMessage.textContent = "Błąd podczas usuwania planu!";
        document.body.appendChild(errorMessage);

        setTimeout(() => {
          document.body.removeChild(errorMessage);
        }, 3000);
      }
    }
  };

  if (error) {
    return (
      <main className="relative mt-30 z-10 bg-[#EDEDED] py-10 px-20 max-w-7xl mx-auto rounded-2xl shadow-2xl">
        <div className="text-center py-8">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative mt-30 z-10 bg-[#EDEDED] py-10 px-20 max-w-7xl mx-auto rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Ulubione plany żywieniowe
        </h1>
      </div>

      {likedPlans.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">❤️</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Nie masz jeszcze żadnych ulubionych planów
          </h3>
          <p className="text-gray-500 mb-6">
            Przejdź do sekcji "Gotowe plany" i dodaj swoje ulubione jadłospisy
          </p>
          <a
            href="/mealplans"
            className="bg-[#EFBD4C] hover:bg-yellow-500 text-black px-8 py-3 rounded-3xl font-semibold inline-block"
          >
            Przeglądaj plany
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {likedPlans.map((plan) => (
            <div key={plan.planId} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-xl text-gray-800">
                      {plan.name}
                    </h3>
                    {plan.diet && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {plan.diet}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{plan.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-900">
                    <span>
                      📅 Dodano: {new Date(plan.addedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() =>
                      handleRemoveFromFavorites(plan.planId, plan.name)
                    }
                    className="bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                    title="Usuń z ulubionych"
                  >
                    🗑️ Usuń
                  </button>
                </div>
              </div>

              {plan.meals && plan.meals.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Posiłki w planie:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plan.meals.map((meal) => (
                      <div
                        key={meal.id}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        {meal.image && (
                          <img
                            src={`https://spoonacular.com/recipeImages/${meal.image}`}
                            alt={meal.title}
                            className="w-25 h-25 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-800">
                            {meal.title}
                          </p>
                          {meal.readyInMinutes && (
                            <p className="text-xs text-gray-500">
                              ⏱️ {meal.readyInMinutes} min
                            </p>
                          )}
                          {meal.sourceUrl && (
                            <a
                              href={meal.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 text-xs hover:text-blue-700 block mt-1"
                            >
                              🔗 Zobacz przepis
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {plan.nutrition && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Wartości odżywcze:
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-2 bg-yellow-50 rounded">
                      <p className="font-semibold text-yellow-700">Kalorie</p>
                      <p className="text-gray-600">
                        {plan.nutrition.calories} kcal
                      </p>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <p className="font-semibold text-blue-700">Białko</p>
                      <p className="text-gray-600">{plan.nutrition.protein}g</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <p className="font-semibold text-green-700">Tłuszcz</p>
                      <p className="text-gray-600">{plan.nutrition.fat}g</p>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <p className="font-semibold text-purple-700">
                        Węglowodany
                      </p>
                      <p className="text-gray-600">
                        {plan.nutrition.carbohydrates}g
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

const FavoritePlansPage = () => {
  return (
    <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <Logo2 />

      <div className="absolute top-0 left-0 w-full z-20">
        <NavbarAuth />
      </div>

      <div className="relative w-full pb-10">
        <BackgroundImages />

        <div className="relative w-full flex justify-center mb-16">
          <FavoritePlansSection />
        </div>
      </div>
    </div>
  );
};

export default FavoritePlansPage;
