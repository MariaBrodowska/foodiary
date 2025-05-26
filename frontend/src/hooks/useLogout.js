import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = async () => {
        try {
            const response = await fetch('/api/user/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                dispatch({ type: 'LOGOUT' });
                
                window.location.href = '/login';
            }
        } catch (error) {
            console.error("Błąd podczas wylogowywania:", error);
        }
    };

    return { logout };
};