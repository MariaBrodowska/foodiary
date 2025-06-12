import React from "react";

const LoadingSpinner = ({ message = "Ładowanie..." }) => {
  return (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#EFBD4C] mb-4"></div>
      <p className="text-xl text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
