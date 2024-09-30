import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './assets/componets/componentesAdicionales/nav';
import Eliminar from './assets/componets/usuario/Eliminar';
import Actualizar from './assets/componets/usuario/Actualizar';
export default function Profile() {
    const navigate = useNavigate(); // Hook para navegación
    const [user, setUser] = useState({
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
    const fetchUserProfile = async (userId) => {
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
        }
        catch (error) {
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
            }
            else {
                console.error('Error al eliminar la cuenta.');
                setAlertMessage('Error al eliminar la cuenta.'); // Mensaje de error
            }
        }
        catch (error) {
            console.error('Error de red:', error);
            setAlertMessage('Error de red al eliminar la cuenta.'); // Mensaje de error
        }
    };
    const handleUpdateAccount = async (id, nombre, // Cambiado a opcional
    correo, // Cambiado a opcional
    contrasena // Cambiado a opcional
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
            }
            else {
                console.error('Error al actualizar la cuenta.');
                setAlertMessage('Error al actualizar la cuenta.'); // Mensaje de error
            }
        }
        catch (error) {
            console.error('Error de red:', error);
            setAlertMessage('Error de red al actualizar la cuenta.'); // Mensaje de error
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Nav, {}), _jsx("div", { className: "flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white", children: _jsxs("div", { className: "w-1/3 bg-gray-800 rounded-lg p-8 shadow-lg", children: [_jsx("img", { src: user.profileImage, alt: "Perfil del usuario", className: "w-24 h-24 rounded-full mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-center mb-2", children: user.name }), _jsx("p", { className: "text-center text-gray-400", children: user.email }), alertMessage && ( // Muestra el mensaje de alerta
                        _jsx("div", { className: "mt-4 p-2 bg-red-600 text-white rounded-md", children: alertMessage })), _jsxs("div", { className: "mt-6 flex justify-around", children: [_jsx("button", { onClick: () => setIsUpdateModalOpen(true), className: "bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md", children: "Actualizar cuenta" }), _jsx("button", { onClick: () => setIsModalOpen(true), className: "bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md", children: "Eliminar cuenta" })] })] }) }), _jsx(Eliminar, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onConfirm: handleDeleteAccount }), _jsx(Actualizar, { isOpen: isUpdateModalOpen, onClose: () => setIsUpdateModalOpen(false), onConfirm: handleUpdateAccount, userId: user.id, userName: user.name, userEmail: user.email })] }));
}
