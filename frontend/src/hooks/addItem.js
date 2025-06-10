import { useState } from "react";
import axios from "axios";

export const addItem = () => {
    const [error, setError] = useState(null);

    const addItem = async (userId, product, quantity) => {
        setError(null);
        try {
            const response = await axios.post('http://localhost:3000/api/user/addItem', {
                userId,
                product,
                quantity
            }, {
                withCredentials: true
            });
            console.log(response.data);
        } catch (err) {
            console.error('Błąd podczas dodawania:', err);
        }
    };
    
    return { addItem, error };
}