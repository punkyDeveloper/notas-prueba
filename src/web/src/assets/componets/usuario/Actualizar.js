import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
const Actualizar = ({ isOpen, onClose, userId, userName, userEmail, onConfirm, }) => {
    const [nombre, setNombre] = useState(userName);
    const [correo, setCorreo] = useState(userEmail);
    const [contrasena, setContrasena] = useState('');
    useEffect(() => {
        setNombre(userName);
        setCorreo(userEmail);
    }, [userName, userEmail]);
    const handleUpdate = async (e) => {
        e.preventDefault();
        await onConfirm(userId, nombre, correo, contrasena); // Llama a la función de confirmación
        onClose(); // Cerrar el modal después de la actualización
    };
    return (_jsxs(Dialog, { open: isOpen, onClose: onClose, className: "relative z-10", children: [_jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }), _jsx("div", { className: "fixed inset-0 z-10 flex items-center justify-center p-4", children: _jsx(Dialog.Panel, { className: "relative w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl transition-all", children: _jsxs("form", { onSubmit: handleUpdate, className: "flex flex-col items-center justify-center p-6 space-y-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Actualizar Usuario" }), _jsxs("div", { className: "w-full", children: [_jsx("label", { htmlFor: "nombre", className: "block text-sm font-medium text-gray-700", children: "Nombre" }), _jsx("input", { id: "nombre", type: "text", value: nombre, onChange: (e) => setNombre(e.target.value), placeholder: "Ingrese su nombre", className: "mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" })] }), _jsxs("div", { className: "w-full", children: [_jsx("label", { htmlFor: "correo", className: "block text-sm font-medium text-gray-700", children: "Correo Electr\u00F3nico" }), _jsx("input", { id: "correo", type: "email", value: correo, onChange: (e) => setCorreo(e.target.value), placeholder: "Ingrese su correo electr\u00F3nico", className: "mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" })] }), _jsxs("div", { className: "w-full", children: [_jsx("label", { htmlFor: "contrasena", className: "block text-sm font-medium text-gray-700", children: "Contrase\u00F1a (opcional)" }), _jsx("input", { id: "contrasena", type: "password", value: contrasena, onChange: (e) => setContrasena(e.target.value), placeholder: "Ingrese una nueva contrase\u00F1a", className: "mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" })] }), _jsxs("div", { className: "flex w-full justify-center space-x-4", children: [_jsx("button", { type: "submit", className: "inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", children: "Actualizar" }), _jsx("button", { type: "button", onClick: onClose, className: "inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2", children: "Cancelar" })] })] }) }) })] }));
};
export default Actualizar;
