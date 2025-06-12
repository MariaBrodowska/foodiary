import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useMyPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
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
    try {
      await axios.post("http://localhost:3000/api/user/my-plans", formData, {
        withCredentials: true,
      });
      fetchPlans();
      return true;
    } catch (error) {
      console.error("Błąd tworzenia planu:", error);
      return false;
    }
  };

  const updatePlan = async (planId, formData) => {
    try {
      await axios.put(
        `http://localhost:3000/api/user/my-plans/${planId}`,
        formData,
        { withCredentials: true }
      );
      fetchPlans();
      return true;
    } catch (error) {
      console.error("Błąd aktualizacji planu:", error);
      return false;
    }
  };

  const deletePlan = async (planId) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/my-plans/${planId}`, {
        withCredentials: true,
      });
      fetchPlans();
      return true;
    } catch (error) {
      console.error("Błąd usuwania planu:", error);
      return false;
    }
  };

  return {
    plans,
    loading,
    searchQuery,
    setSearchQuery,
    createPlan,
    updatePlan,
    deletePlan,
    refetch: fetchPlans,
  };
};

export default useMyPlans;
