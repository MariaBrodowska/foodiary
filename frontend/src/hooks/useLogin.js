import { useState } from "react";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      setIsLoading(false);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Błąd podczas logowania:", err);
      setIsLoading(false);

      if (err.response && err.response.data && err.response.data.error) {
        //komunikat z modelu
        setError(err.response.data.error);
      } else if (err.request) {
        setError("Brak połączenia z serwerem. Sprawdź połączenie internetowe");
      } else {
        setError("Wystąpił błąd podczas logowania. Spróbuj ponownie");
      }
    }
  };

  return { login, isLoading, error };
};
