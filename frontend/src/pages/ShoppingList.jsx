import React, { useState } from "react";
import NavbarAuth from "../components/nav/NavbarAuth";
import Logo2 from "../components/common/Logo2";
import { useShoppingList } from "../hooks/useShoppingList";

const BackgroundImages = () => (
  <>
    <img
      src="dashboardpage/green-ellipse.png"
      alt="green ellipse"
      className="absolute top-0 right-0 lg:scale-90 scale-84 origin-top-right z-0 pointer-events-none select-none"
    />
  </>
);

const ShoppingListSection = () => {
  const {
    items,
    loading,
    error,
    setError,
    purchasedCount,
    totalCount,
    addItem,
    togglePurchased,
    deleteItem,
    clearPurchased,
  } = useShoppingList();

  const [newProduct, setNewProduct] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const handleAddItem = async () => {
    if (newProduct.trim() && newQuantity.trim()) {
      try {
        await addItem(newProduct, newQuantity);
        setNewProduct("");
        setNewQuantity("");
      } catch (error) {
        console.error("Błąd dodawania produktu:", error);
      }
    } else {
      setError("Wypełnij wszystkie pola przed dodaniem produktu");
    }
  };

  if (loading) {
    return (
      <main className="relative mt-30 z-10 bg-[#EDEDED] py-10 px-20 max-w-5xl mx-auto rounded-2xl shadow-2xl">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC440]"></div>
          <span className="ml-4 text-gray-600">Ładowanie listy zakupów...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="relative mt-20 sm:mt-24 lg:mt-30 z-10 bg-[#EDEDED] py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-12 xl:px-20 max-w-full sm:max-w-4xl lg:max-w-5xl mx-auto rounded-2xl shadow-2xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Lista Zakupów
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
            <span className="text-gray-700 text-sm sm:text-base">
              Postęp zakupów
            </span>
            <span className="text-[#FFC440] font-semibold text-sm sm:text-base">
              {purchasedCount}/{totalCount}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
            <div
              className="bg-[#FFC440] h-2 sm:h-3 rounded-full transition-all duration-300"
              style={{
                width: `${
                  totalCount > 0 ? (purchasedCount / totalCount) * 100 : 0
                }%`,
              }}
            ></div>
          </div>
          {purchasedCount > 0 && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={clearPurchased}
                className="text-xs sm:text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Usuń kupione produkty
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Dodaj nowy produkt
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm">
                Nazwa produktu
              </label>
              <input
                type="text"
                value={newProduct}
                onChange={(e) => {
                  setNewProduct(e.target.value);
                  if (error) setError(null); //czyszczenie bledu gdy zaczyna pisac
                }}
                placeholder="np. Mleko"
                className="border-[#858585] border bg-white rounded-xl px-3 sm:px-4 py-2 sm:py-3 w-full text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm">
                Ilość
              </label>
              <input
                type="text"
                value={newQuantity}
                onChange={(e) => {
                  setNewQuantity(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="np. 1 litr"
                className="border-[#858585] border bg-white rounded-xl px-3 sm:px-4 py-2 sm:py-3 w-full text-xs sm:text-sm"
              />
            </div>
            <div className="flex items-end sm:col-span-1 lg:col-span-1">
              <button
                onClick={handleAddItem}
                className="bg-[#EFBD4C] hover:bg-yellow-500 text-black rounded-3xl px-4 sm:px-6 py-2 sm:py-3 w-full font-semibold text-xs sm:text-sm"
              >
                DODAJ PRODUKT
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Twoja lista ({totalCount} produktów)
          </h2>
          {items.length === 0 ? (
            <div className="bg-white rounded-lg p-6 sm:p-8 text-center text-gray-500">
              Twoja lista zakupów jest pusta. Dodaj pierwszy produkt!
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className={`bg-white rounded-lg p-3 sm:p-4 flex items-center justify-between shadow-sm transition-all ${
                  item.purchased ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                  <input
                    type="checkbox"
                    checked={item.purchased}
                    onChange={() => togglePurchased(item._id)}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC440] bg-gray-100 border-gray-300 rounded focus:ring-[#FFC440] focus:ring-2"
                  />
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold text-sm sm:text-base truncate ${
                        item.purchased
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      {item.product}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm ${
                        item.purchased
                          ? "line-through text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      item.purchased
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.purchased ? "Kupione" : "Do kupienia"}
                  </span>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="text-red-500 hover:text-red-700 p-1 sm:p-2 rounded-lg hover:bg-red-50"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

const ShoppingList = () => {
  return (
    <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <Logo2 />

      <div className="absolute top-0 left-0 w-full z-20">
        <NavbarAuth />
      </div>

      <div className="relative w-full pb-10">
        <BackgroundImages />

        <div className="relative w-full flex justify-center mb-16">
          <ShoppingListSection />
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
