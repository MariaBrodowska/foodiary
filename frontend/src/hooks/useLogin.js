import { useState } from "react";
import axios from "axios";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3000/api/user/login', { email, password }, {
                withCredentials: true,
            });

            setIsLoading(false);

            window.location.href = '/dashboard';
            console.log('Logowanie udane:', response.data);
            console.log('Response headers:', response.headers);
            console.log('Cookies przed przekierowaniem:', document.cookie);
        } catch (err) {
            console.error('Błąd podczas logowania:', err);
            setError('Wystąpił błąd podczas łączenia z serwerem');
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};            