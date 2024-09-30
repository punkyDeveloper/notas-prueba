<<<<<<< HEAD
import React, { useState, useEffect } from 'react'; 
=======
import React , { useState, useEffect } from 'react'; 
>>>>>>> 5a3a5168e8c1fc596e9faff5196857218199aa54
import { useNavigate } from 'react-router-dom';
import Nav from './assets/componets/componentesAdicionales/nav.tsx';
import Eliminar from './assets/componets/usuario/Eliminar.tsx';
import Actualizar from './assets/componets/usuario/Actualizar.tsx';

export default function Profile() {
  const navigate = useNavigate(); // Hook para navegación

  const [user, setUser] = useState<{ id: string; name: string; email: string; profileImage: string }>({
      id: '',
      name: '',
      email: '',
      profileImage: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(''); // Nuevo estado para manejar alertas

  useEffect(() => {
      const userId = localStorage.getItem('usuarioId');
      if (userId) {
          fetchUserProfile(userId);
      }
  }, []);

  const fetchUserProfile = async (userId: string) => { 
      try {
          const response = await fetch(`${import.meta.env.VITE_URL_web}/usuario/${userId}`); 
          if (!response.ok) {
              throw new Error('Error al obtener el perfil');
          }
          const data = await response.json();
          setUser({
              id: data._id || '', 
              name: data.fullName || 'Nombre no disponible', 
              email: data.email || 'Correo no disponible', 
              profileImage: data.profileImage || 'https://via.placeholder.com/150' 
          });
      } catch (error) {
          console.error('Error al obtener el usuario:', error);
          setAlertMessage('Error al obtener el perfil del usuario.'); // Muestra un mensaje de error
      }
  };

  const handleDeleteAccount = async () => {
      try {
          const response = await fetch(`${import.meta.env.VITE_URL_web}/eliminar/${user.id}`, {
              method: 'DELETE',
          });

          if (response.ok) {
              console.log('Cuenta eliminada con ID:', user.id);
              localStorage.removeItem('usuarioId'); // Limpia el localStorage
              setUser({ id: '', name: '', email: '', profileImage: '' }); // Resetea el usuario
              setIsModalOpen(false);
              setAlertMessage('Cuenta eliminada exitosamente.'); // Mensaje de éxito
              navigate("/");
          } else {
              console.error('Error al eliminar la cuenta.');
              setAlertMessage('Error al eliminar la cuenta.'); // Mensaje de error
          }
      } catch (error) {
          console.error('Error de red:', error);
          setAlertMessage('Error de red al eliminar la cuenta.'); // Mensaje de error
      }
  };

  const handleUpdateAccount = async (
      id: string,
      nombre?: string,    // Cambiado a opcional
      correo?: string,     // Cambiado a opcional
      contrasena?: string  // Cambiado a opcional
  ) => {
      try {
          const response = await fetch(`${import.meta.env.VITE_URL_web}/actualizar/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  nombre: nombre || undefined,
                  correo: correo || undefined,
                  contrasena: contrasena || undefined,
              }),
          });
  
          if (response.ok) {
              const updatedUser = await response.json();
              console.log('Usuario actualizado:', updatedUser);
              fetchUserProfile(id); // Actualiza la información del perfil
              setIsUpdateModalOpen(false); // Cierra el modal
              setAlertMessage('Usuario actualizado exitosamente.'); // Mensaje de éxito
              navigate("/perfil");
          } else {
              console.error('Error al actualizar la cuenta.');
              setAlertMessage('Error al actualizar la cuenta.'); // Mensaje de error
          }
          
      } catch (error) {
          console.error('Error de red:', error);
          setAlertMessage('Error de red al actualizar la cuenta.'); // Mensaje de error
      }
  };

  return (
      <>
          <Nav />
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
              <div className="w-1/3 bg-gray-800 rounded-lg p-8 shadow-lg">
                  <img
                      src={user.profileImage}
                      alt="Perfil del usuario"
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-bold text-center mb-2">{user.name}</h2>
                  <p className="text-center text-gray-400">{user.email}</p>

                  {alertMessage && ( // Muestra el mensaje de alerta
                      <div className="mt-4 p-2 bg-red-600 text-white rounded-md">
                          {alertMessage}
                      </div>
                  )}

                  <div className="mt-6 flex justify-around">
                      <button
                          onClick={() => setIsUpdateModalOpen(true)} // Abre el modal de actualización
                          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md"
                      >
                          Actualizar cuenta
                      </button>
                      <button
                          onClick={() => setIsModalOpen(true)} // Abre la modal de confirmación
                          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md"
                      >
                          Eliminar cuenta
                      </button>
                  </div>
              </div>
          </div>

          {/* Componente de Modal de Confirmación */}
          <Eliminar
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleDeleteAccount} // Cambiado para llamar a la función correctamente
          />

          {/* Componente de Modal de Actualización */}
          <Actualizar
              isOpen={isUpdateModalOpen}
              onClose={() => setIsUpdateModalOpen(false)}
              onConfirm={handleUpdateAccount} // Modificado para manejar correctamente la actualización
              userId={user.id}
              userName={user.name}
              userEmail={user.email}
          />
      </>
  );
}
