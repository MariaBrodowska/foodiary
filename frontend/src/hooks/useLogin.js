import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
                credentials: 'include'
            });
            
            const json = await response.json();
            
            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
                return;
            }
            
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
            
            window.location.href = '/dashboard';
        } catch (err) {
            console.error('Błąd podczas logowania:', err);
            setError('Wystąpił błąd podczas łączenia z serwerem');
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};