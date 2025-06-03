import { useState } from "react";
import axios from "axios";

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const logout = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.post('http://localhost:3000/api/user/logout', {}, {
                withCredentials: true,
            });
            console.log('Wylogowanie udane:', response.data);
            setIsLoading(false);
            window.location.href = '/login';
            
        } catch (error) {
            console.error("Błąd podczas wylogowywania:", error);
            setError('Wystąpił błąd podczas wylogowywania');
            setIsLoading(false);
        }
    };

    return { logout, error, isLoading };
};