import React from "react";

const SearchInput = ({ value, onChange, placeholder = "Szukaj..." }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
};

export default SearchInput;
