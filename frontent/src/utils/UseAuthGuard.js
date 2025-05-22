import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthGuard = () => {
  const navigate = useNavigate();

  const userLocalData = localStorage.getItem('userData');
  const userData = userLocalData ? JSON.parse(userLocalData) : null;

  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData]);

  return userData;
};

export default useAuthGuard;
