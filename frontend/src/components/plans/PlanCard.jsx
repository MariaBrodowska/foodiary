import React from "react";

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

const PlanCard = ({ plan, onEdit, onDelete, onSelect }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => onSelect(plan)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
          {plan.name}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(plan);
            }}
            className="text-blue-500 hover:text-blue-700 p-1"
            title="Edytuj"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(plan._id, plan.name);
            }}
            className="text-red-500 hover:text-red-700 p-1"
            title="Usuń"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-6 text-sm text-gray-500">
          {plan.dietType && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {DIET_TYPES.find((d) => d.value === plan.dietType)?.label}
            </span>
          )}
          {plan.dailyCalories && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              {plan.dailyCalories} kcal
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">
          📅 {new Date(plan.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium">🌅 Śniadanie:</span>{" "}
          {plan.breakfast.substring(0, 50)}...
        </p>
        <p>
          <span className="font-medium">☀️ Obiad:</span>{" "}
          {plan.lunch.substring(0, 50)}...
        </p>
        <p>
          <span className="font-medium">🌙 Kolacja:</span>{" "}
          {plan.dinner.substring(0, 50)}...
        </p>
      </div>

      <div className="mt-4 text-center">
        <span className="text-blue-500 text-sm font-medium">
          Kliknij, aby zobaczyć szczegóły
        </span>
      </div>
    </div>
  );
};

export default PlanCard;
