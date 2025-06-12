import React from "react";

// Constants moved from utils
const DIET_TYPES = [
  { value: "", label: "Brak wybranej diety" },
  { value: "vegetarian", label: "Wegetariańska" },
  { value: "vegan", label: "Wegańska" },
  { value: "ketogenic", label: "Ketogeniczna" },
  { value: "paleo", label: "Paleo" },
  { value: "gluten free", label: "Bezglutenowa" },
  { value: "pescetarian", label: "Pescetariańska" },
  { value: "primal", label: "Pierwotna" },
];

const MEAL_TYPES = {
  breakfast: {
    emoji: "🌅",
    label: "Śniadanie",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
  },
  lunch: {
    emoji: "☀️",
    label: "Obiad",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
  },
  dinner: {
    emoji: "🌙",
    label: "Kolacja",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
};

const PlanDetails = ({ plan, onEdit, onDelete, onBack }) => {
  return (
    <main className="relative mt-30 z-10 bg-[#EDEDED] py-10 px-20 max-w-7xl mx-auto rounded-2xl shadow-2xl">
      <button
        onClick={onBack}
        className="mb-6 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
      >
        ← Powrót do listy planów
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {plan.name}
            </h2>
            {plan.dietType && (
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {DIET_TYPES.find((d) => d.value === plan.dietType)?.label}
              </span>
            )}
            {plan.dailyCalories && (
              <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full ml-2">
                {plan.dailyCalories} kcal
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(plan)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              ✏️ Edytuj
            </button>
            <button
              onClick={() => onDelete(plan._id, plan.name)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              🗑️ Usuń
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(MEAL_TYPES).map(([mealType, mealInfo]) => (
            <div
              key={mealType}
              className={`p-6 ${mealInfo.bgColor} rounded-lg`}
            >
              <h3
                className={`text-xl font-semibold ${mealInfo.textColor} mb-3`}
              >
                {mealInfo.emoji} {mealInfo.label}
              </h3>
              {plan[`${mealType}Image`] && (
                <div className="mb-4">
                  <img
                    src={plan[`${mealType}Image`]}
                    alt={mealInfo.label}
                    className="w-full max-w-md h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
              <p className="text-gray-700 leading-relaxed">{plan[mealType]}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t text-sm text-gray-500">
          <p>Utworzono: {new Date(plan.createdAt).toLocaleDateString()}</p>
          {plan.updatedAt !== plan.createdAt && (
            <p>
              Ostatnia edycja: {new Date(plan.updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default PlanDetails;
