import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useMyPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/my-plans?search=${searchQuery}`,
        { withCredentials: true }
      );
      setPlans(response.data.plans);
    } catch (error) {
      console.error("Błąd pobierania planów:", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const createPlan = async (formData) => {
    setError(null);
    try {
      await axios.post("http://localhost:3000/api/user/my-plans", formData, {
        withCredentials: true,
      });
      fetchPlans();
      return { success: true };
    } catch (err) {
      console.error("Błąd tworzenia planu:", err);
      let errorMessage = "Wystąpił błąd podczas tworzenia planu";

      if (err.response && err.response.data && err.response.data.error) {
        errorMessage = err.response.data.error;
        //usun validation failed
        if (errorMessage.includes("validation failed:")) {
          errorMessage = errorMessage.split("validation failed:")[1];
        }
        //zostawienie samych komunikatow
        errorMessage = errorMessage.replace(/\b\w+:\s*/g, "").trim();
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const updatePlan = async (planId, formData) => {
    setError(null);
    try {
      await axios.put(
        `http://localhost:3000/api/user/my-plans/${planId}`,
        formData,
        { withCredentials: true }
      );
      fetchPlans();
      return { success: true };
    } catch (err) {
      console.error("Błąd aktualizacji planu:", err);
      let errorMessage = "Wystąpił błąd podczas aktualizacji planu";

      if (err.response && err.response.data && err.response.data.error) {
        errorMessage = err.response.data.error;
        if (errorMessage.includes("validation failed:")) {
          errorMessage = errorMessage.split("validation failed:")[1];
        }
        errorMessage = errorMessage.replace(/\b\w+:\s*/g, "").trim();
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const deletePlan = async (planId) => {
    setError(null);
    try {
      await axios.delete(`http://localhost:3000/api/user/my-plans/${planId}`, {
        withCredentials: true,
      });
      fetchPlans();
      return { success: true };
    } catch (err) {
      console.error("Błąd usuwania planu:", err);
      let errorMessage = "Wystąpił błąd podczas usuwania planu";

      if (err.response && err.response.data && err.response.data.error) {
        errorMessage = err.response.data.error;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    plans,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    createPlan,
    updatePlan,
    deletePlan,
    clearError,
    refetch: fetchPlans,
  };
};

export default useMyPlans;
