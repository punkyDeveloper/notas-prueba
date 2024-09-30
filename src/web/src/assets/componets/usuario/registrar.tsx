import React from 'react';
import { Field, Label } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import React, { useState } from 'react';

import Modal from '../componentesAdicionales/modalRegistroExitoso';
=======
import { useState } from 'react';
import Modal from '../componentesAdicionales/modalRegistroExitoso.tsx';
>>>>>>> 5a3a5168e8c1fc596e9faff5196857218199aa54

export default function Example() {
    const navigate = useNavigate(); // Hook para navegación
    const [formData, setFormData] = useState({
      name: '',
      correo: '',
      contrasena: ''
    });
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para la modal
  
    const handleLoginRedirect = () => {
      navigate('/'); // Redirige a la página de login
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      // Validar que todos los campos estén llenos
      if (!formData.name || !formData.correo || !formData.contrasena) {
        setError('Por favor, completa todos los campos.');
        return;
      }
  
      try {
        // Mostrar los datos que se van a enviar para verificar en la consola
        console.log('Datos enviados:', formData);
  
        const response = await fetch(`${import.meta.env.VITE_URL_web}/registrar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          if (data.error === 'El correo ya está registrado. Por favor usa otro.') {
            setError('El correo ya está registrado.');
          } else {
            setError('Hubo un error en el registro.');
          }
          return;
        }
  
        // Si el registro es exitoso, abre la modal
        setIsModalOpen(true);
      } catch (error) {
        setError('Hubo un error en la solicitud');
        console.error(error);
      }
    };
  
    return (
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        >
          {/* Aquí va el contenido del fondo */}
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Registrar</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">Podrás tener tus recordatorios.</p>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2.5">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div className="sm:col-span-2">
              <label htmlFor="correo" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div className="sm:col-span-2">
              <label htmlFor="contrasena" className="block text-sm font-semibold leading-6 text-gray-900">
                Contraseña
              </label>
              <div className="mt-2.5">
                <input
                  id="contrasena"
                  name="contrasena"
                  type="password"
                  value={formData.contrasena}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <Field className="flex gap-x-4 sm:col-span-2">
              <Label className="text-sm leading-6 text-gray-600">
                Ya tengo cuenta{' '}
                <button type="button" onClick={handleLoginRedirect} className="font-semibold text-indigo-600">
                  Login
                </button>
                .
              </Label>
            </Field>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Registrar
            </button>
          </div>
        </form>
  
        {/* Modal para registro exitoso */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => { 
            setIsModalOpen(false); 
            navigate('/'); 
          }} 
        />
      </div>
    );
  }