import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// main
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Eliminar la importación del store
// import store from './store.js'; // Importa tu store de Redux
import Login from './login'; // Componente de inicio de sesión
import Notas from './nota'; // Componente de notas
import Perfiles from './perfil'; // Componente de perfiles
import Registerse from './registrarte'; // Componente de registro
import PrivateRoute from './privadas'; // Importa la ruta protegida
import "../src/assets/tailwind.css"; // Importa Tailwind CSS
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Registerse, {}) }), _jsx(Route, { path: "/notas", element: _jsx(PrivateRoute, { children: _jsx(Notas, {}) }) }), _jsx(Route, { path: "/perfil", element: _jsx(PrivateRoute, { children: _jsx(Perfiles, {}) }) })] }) }));
