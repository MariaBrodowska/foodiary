import { useState, useEffect } from "react";
import axios from "axios";

export const useShoppingList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/shopping", {
        withCredentials: true,
      });
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError("Błąd podczas pobierania listy zakupów");
      console.error("Błąd pobierania listy zakupów:", err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (product, quantity) => {
    try {
      console.log("Attempting to add item:", { product, quantity });
      const response = await axios.post(
        "http://localhost:3000/api/shopping",
        {
          product,
          quantity,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Response from server:", response.data);
      setItems((prev) => [response.data, ...prev]);
      setError(null);
      return response.data;
    } catch (err) {
      console.error("Error adding item:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      setError(
        `Błąd podczas dodawania produktu: ${
          err.response?.data?.error || err.message
        }`
      );
      throw err;
    }
  };

  const togglePurchased = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/shopping/${id}/toggle`,
        {},
        {
          withCredentials: true,
        }
      );
      setItems((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
    } catch (err) {
      setError("Błąd podczas aktualizacji elementu");
      console.error("Błąd aktualizacji elementu:", err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/shopping/${id}`, {
        withCredentials: true,
      });
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError("Błąd podczas usuwania elementu");
      console.error("Błąd usuwania elementu:", err);
    }
  };

  const clearPurchased = async () => {
    try {
      await axios.delete("http://localhost:3000/api/shopping/purchased/clear", {
        withCredentials: true,
      });
      setItems((prev) => prev.filter((item) => !item.purchased));
    } catch (err) {
      setError("Błąd podczas usuwania kupionych elementów");
      console.error("Błąd usuwania kupionych elementów:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const purchasedCount = items.filter((item) => item.purchased).length;
  const totalCount = items.length;

  return {
    items,
    loading,
    error,
    purchasedCount,
    totalCount,
    addItem,
    togglePurchased,
    deleteItem,
    clearPurchased,
    refreshItems: fetchItems,
  };
};
