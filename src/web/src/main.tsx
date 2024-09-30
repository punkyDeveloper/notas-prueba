// main.tsx
import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login'; // Componente de inicio de sesión
import Notas from './nota'; // Componente de notas
import Perfiles from './perfil'; // Componente de perfiles
import Registerse from './registrarte'; // Componente de registro
import PrivateRoute from './privadas'; // Importa la ruta protegida
import "../src/assets/tailwind.css"; // Importa Tailwind CSS

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>
    <Routes>
      {/* Ruta para el Login */}
      <Route path="/" element={<Login />} />
      
      {/* Ruta para el Registro */}
      <Route path="/register" element={<Registerse />} />
      
      {/* Rutas protegidas */}
      <Route 
        path="/notas" 
        element={
          <PrivateRoute>
            <Notas />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/perfil" 
        element={
          <PrivateRoute>
            <Perfiles />
          </PrivateRoute>
        } 
      />
    </Routes>
  </Router>
);