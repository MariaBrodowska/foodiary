import React from "react";
import MealImageUpload from "./MealImageUpload";

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

const PlanForm = ({
  formData,
  editingPlan,
  onInputChange,
  onImageUpload,
  onImageRemove,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Nazwa planu *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Śniadanie *
        </label>
        <textarea
          name="breakfast"
          value={formData.breakfast}
          onChange={onInputChange}
          rows="3"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Obiad *
        </label>
        <textarea
          name="lunch"
          value={formData.lunch}
          onChange={onInputChange}
          rows="3"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Kolacja *
        </label>
        <textarea
          name="dinner"
          value={formData.dinner}
          onChange={onInputChange}
          rows="3"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Kalorie dzienne (opcjonalne)
          </label>
          <input
            type="number"
            name="dailyCalories"
            value={formData.dailyCalories}
            onChange={onInputChange}
            min="800"
            max="5000"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Typ diety
          </label>
          <select
            name="dietType"
            value={formData.dietType}
            onChange={onInputChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {DIET_TYPES.map((diet) => (
              <option key={diet.value} value={diet.value}>
                {diet.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Zdjęcia posiłków (opcjonalne)
        </h3>

        {Object.entries(MEAL_TYPES).map(([mealType, mealInfo]) => (
          <MealImageUpload
            key={mealType}
            mealType={mealType}
            image={formData[`${mealType}Image`]}
            onImageUpload={onImageUpload}
            onImageRemove={onImageRemove}
            emoji={mealInfo.emoji}
            label={mealInfo.label}
          />
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
        >
          Anuluj
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-[#EFBD4C] hover:bg-yellow-500 text-black rounded-xl font-semibold"
        >
          {editingPlan ? "Zaktualizuj plan" : "Utwórz plan"}
        </button>
      </div>
    </form>
  );
};

export default PlanForm;
