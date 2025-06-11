import { useState, useEffect } from "react";
import axios from "axios";

const useLikedPlans = () => {
  const [likedPlans, setLikedPlans] = useState([]);

  const fetchLikedPlans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/favorite-meal-plans",
        {
          withCredentials: true,
        }
      );
      setLikedPlans(response.data.favoritePlans || []);
    } catch (error) {
      console.error("Błąd pobierania ulubionych:", error);
      setLikedPlans([]);
    }
  };

  const toggleLike = async (planId, planData = null) => {
    try {
      const isCurrentlyLiked = likedPlans.some(
        (plan) => plan.planId === planId
      );

      if (isCurrentlyLiked) {
        await axios.delete(
          `http://localhost:3000/api/user/favorite-meal-plans/${planId}`,
          {
            withCredentials: true,
          }
        );
        setLikedPlans((prev) => prev.filter((plan) => plan.planId !== planId));
      } else {
        if (!planData) {
          console.error("Brak danych planu do dodania");
          alert("Brak danych planu do dodania");
          return;
        }

        await axios.post(
          "http://localhost:3000/api/user/favorite-meal-plans",
          { planData },
          { withCredentials: true }
        );
        await fetchLikedPlans();
      }
    } catch (error) {
      console.error("Błąd zmiany stanu ulubionego:", error);

      if (error.response?.status === 400) {
        alert("Błąd: " + (error.response.data?.error || "Nieprawidłowe dane"));
      } else if (error.response?.status === 401) {
        alert("Musisz być zalogowany, aby dodać plan do ulubionych");
      } else {
        alert("Wystąpił błąd podczas zapisywania ulubionych.");
      }
    }
  };

  const isLiked = (planId) => likedPlans.some((plan) => plan.planId === planId);

  useEffect(() => {
    fetchLikedPlans();
  }, []);

  return { likedPlans, toggleLike, isLiked, refetch: fetchLikedPlans };
};

export default useLikedPlans;
