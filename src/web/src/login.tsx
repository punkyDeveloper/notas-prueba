import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate(); // Hook para navegación
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    if (!email || !password) {
      setError('Por favor, ingrese ambos email y contraseña.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_URL_web}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Obtiene la respuesta JSON

      if (!response.ok) {
        setError(data.message); // Muestra el mensaje de error del servidor
        return;
      }

      console.log('Datos de respuesta:', data); // Verifica los datos de respuesta

      // Almacena el token y el usuarioId en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuarioId', data.user.id); // Almacena el usuarioId
      console.log('Redirigiendo a /notas'); // Añade esta línea
      // Redirige a la página de notas
      navigate('/notas');
    } catch (err) {
      console.error('Error en la solicitud:', err);
      setError('Error al iniciar sesión. Intenta nuevamente.');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Ingresa
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Correo
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>} {/* Muestra el mensaje de error */}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          No tienes cuenta?{' '}
          <button onClick={handleRegisterRedirect} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}
