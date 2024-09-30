import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Obtén el token del almacenamiento local
  const token = localStorage.getItem('token');

  // Verifica si el usuario está autenticado
  const isAuthenticated = !!token;

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;