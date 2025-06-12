import React from "react";

const MealImageUpload = ({
  mealType,
  image,
  onImageUpload,
  onImageRemove,
  emoji,
  label,
}) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">
        {emoji} Zdjęcie {label.toLowerCase()}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onImageUpload(e, mealType)}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
      />
      {image && (
        <div className="mt-3">
          <img
            src={image}
            alt={`Podgląd ${label.toLowerCase()}`}
            className="w-32 h-24 object-cover rounded-lg shadow-md"
          />
          <button
            type="button"
            onClick={() => onImageRemove(mealType)}
            className="mt-2 text-red-500 hover:text-red-700 text-sm"
          >
            ✕ Usuń zdjęcie
          </button>
        </div>
      )}
    </div>
  );
};

export default MealImageUpload;
