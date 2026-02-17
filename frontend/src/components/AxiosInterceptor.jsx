import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    setIsSet(true);

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return isSet && children;
};

export default AxiosInterceptor;
