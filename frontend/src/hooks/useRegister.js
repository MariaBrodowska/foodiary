import {useState} from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {dispatch} = useAuthContext();

    const signup = async (email, password, sex, activity, height, weight) => {
        setIsLoading(true);
        setError(null);

        try{
            const response = await fetch('api/user/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password, sex, activity, height, weight}),
                credentials: 'include'
            })

            const json = await response.json();
            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
                return;
            }
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
            window.location.href = '/dashboard';
        }
        catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    };
    return {signup, isLoading, error};
}