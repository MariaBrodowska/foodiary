import React from "react";

const EmptyPlansState = ({ searchQuery, onAddPlan }) => {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">📝</div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        {searchQuery
          ? "Brak planów pasujących do wyszukiwania"
          : "Nie masz jeszcze żadnych planów"}
      </h3>
      <p className="text-gray-500 mb-6">
        {searchQuery
          ? "Spróbuj zmienić kryteria wyszukiwania"
          : "Utwórz swój pierwszy plan żywieniowy"}
      </p>
      {!searchQuery && (
        <button
          onClick={onAddPlan}
          className="bg-[#EFBD4C] hover:bg-yellow-500 text-black px-8 py-3 rounded-3xl font-semibold"
        >
          Dodaj pierwszy plan
        </button>
      )}
    </div>
  );
};

export default EmptyPlansState;
