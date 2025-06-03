import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/user/userData', {
          withCredentials: true
        });
        setUserData(response.data);
        setError(null);
      } catch (err) {
        console.error('Błąd pobierania danych użytkownika:', err);
        setError(err.response?.data?.message || 'Wystąpił błąd podczas pobierania danych');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, loading, error };
};

export default useUserData;