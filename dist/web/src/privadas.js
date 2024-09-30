import React from 'react';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ children }) => {
    // Obtén el token del almacenamiento local
    const token = localStorage.getItem('token');
    // Verifica si el usuario está autenticado
    const isAuthenticated = !!token;
    return isAuthenticated ? children : React.createElement(Navigate, { to: "/" });
};
export default PrivateRoute;
