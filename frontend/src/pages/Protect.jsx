import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { ENDPOINTS } from '../utils/endpoints';
import Loader from '../components/Loader';

export const Protect = ({children}) => {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
    axios.get(ENDPOINTS.VERIFY_USER, { withCredentials: true })
        .then(() => setIsAuth(true))
        .catch(() => setIsAuth(false));
    }, []);

    if (isAuth === null) return <Loader />;
    if (!isAuth) return <Navigate to="/login" />;

    return children;

}