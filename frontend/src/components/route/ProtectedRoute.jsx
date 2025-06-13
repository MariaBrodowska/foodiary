import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const handleIsLoggedIn = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/check",
          {
            withCredentials: true,
          }
        );

        console.log("ProtectedRoute response:", response.data);
        setAuthState({ isAuthenticated: true, isLoading: false });
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Błąd podczas sprawdzania logowania:", error);
        }
        setAuthState({ isAuthenticated: false, isLoading: false });
      }
    };

    handleIsLoggedIn();
  }, []);

  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Sprawdzanie autoryzacji...</div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
