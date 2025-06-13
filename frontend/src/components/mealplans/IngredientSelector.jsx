import React, { useState } from "react";
import { ingredientCategories } from "../../data/ingredients";

const IngredientSelector = ({ selectedIngredients, onIngredientsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleIngredient = (ingredient) => {
    const newSelected = selectedIngredients.includes(ingredient)
      ? selectedIngredients.filter((item) => item !== ingredient)
      : [...selectedIngredients, ingredient];

    onIngredientsChange(newSelected);
  };

  const removeIngredient = (ingredient) => {
    const newSelected = selectedIngredients.filter(
      (item) => item !== ingredient
    );
    onIngredientsChange(newSelected);
  };

  const clearAll = () => {
    onIngredientsChange([]);
  };

  return (
    <div className="relative">
      <label className="text-gray-700 font-semibold block mb-2">
        Składniki do wykluczenia:
      </label>

      {selectedIngredients.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedIngredients.map((ingredient) => (
            <span
              key={ingredient}
              className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-red-200"
            >
              {ingredient}
              <button
                onClick={() => removeIngredient(ingredient)}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                ×
              </button>
            </span>
          ))}
          <button
            onClick={clearAll}
            className="text-gray-500 hover:text-red-600 text-sm px-2"
          >
            Wyczyść wszystko
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border-[#858585] border bg-white rounded-xl px-4 py-3 text-left text-[13px] flex justify-between items-center"
      >
        <span className="text-gray-500">
          {selectedIngredients.length === 0
            ? "Wybierz składniki do wykluczenia..."
            : `Wykluczono ${selectedIngredients.length} składników`}
        </span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-96 overflow-hidden">
          <div className="flex">
            <div className="w-1/3 border-r bg-gray-50">
              {Object.keys(ingredientCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 ${
                    activeCategory === category
                      ? "bg-[#EFBD4C] text-black font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="w-2/3 max-h-96 overflow-y-auto">
              {activeCategory ? (
                <div className="p-2">
                  <h4 className="font-semibold text-gray-700 px-2 py-2 border-b">
                    {activeCategory}
                  </h4>
                  <div className="grid grid-cols-1 gap-1 mt-2">
                    {ingredientCategories[activeCategory].map((ingredient) => (
                      <label
                        key={ingredient}
                        className="flex items-center px-2 py-2 hover:bg-gray-50 cursor-pointer rounded"
                      >
                        <input
                          type="checkbox"
                          checked={selectedIngredients.includes(ingredient)}
                          onChange={() => toggleIngredient(ingredient)}
                          className="mr-3 accent-[#EFBD4C]"
                        />
                        <span className="text-sm text-gray-700">
                          {ingredient}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Wybierz kategorię aby zobaczyć składniki
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-1">
        🚫 Wybierz składniki, których nie chcesz w swoich posiłkach
      </p>
    </div>
  );
};

export default IngredientSelector;
