import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('/api/user/status', {
                    credentials: 'include'
                });
                
                const json = await response.json();
                
                if (response.ok) {
                    dispatch({ type: 'LOGIN', payload: json });
                }
            } catch (error) {
                console.error("Błąd sprawdzania statusu autoryzacji:", error);
            }
        };
        
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    );
};