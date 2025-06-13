import { useState } from "react";
import axios from "axios";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (
    email,
    password,
    sex,
    activity,
    height,
    weight,
    goal,
    age
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        {
          email,
          password,
          sex,
          activity,
          height,
          weight,
          goal,
          age,
        },
        {
          withCredentials: true,
        }
      );

      setIsLoading(false);
      window.location.href = "/dashboard";
      console.log("Rejestracja udana:", response.data);
    } catch (err) {
      console.error("Błąd podczas rejestracji:", err);
      setIsLoading(false);

      if (err.response && err.response.data && err.response.data.error) {
        //usuniecie validation failed
        let errorMessage = err.response.data.error;
        if (errorMessage.startsWith("User validation failed: ")) {
          errorMessage = errorMessage.replace("User validation failed: ", "");
        }

        //sam komunikat
        errorMessage = errorMessage.replace(/\b\w+:\s*/g, "");

        setError(errorMessage);
      } else if (err.request) {
        setError("Brak połączenia z serwerem. Sprawdź połączenie internetowe");
      } else {
        setError("Wystąpił błąd podczas rejestracji. Spróbuj ponownie");
      }
    }
  };

  return { signup, isLoading, error };
};
