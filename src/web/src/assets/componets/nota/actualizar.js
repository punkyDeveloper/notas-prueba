import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
const Actualizar = ({ notaId, onUpdateSuccess, onClose }) => {
    const [nombre, setNombre] = useState('');
    const [nota, setNota] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const usuarioId = localStorage.getItem('usuarioId');
    useEffect(() => {
        const fetchNota = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL_web}/notas/nota/${notaId}`);
                if (!response.ok)
                    throw new Error('Error al obtener la nota');
                const data = await response.json();
                setNombre(data.nombre);
                setNota(data.nota);
            }
            catch (err) {
                setError('Error al cargar la nota.');
            }
        };
        fetchNota();
    }, [notaId]);
    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        if (!nombre || !nota) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:3001/notas/actualizar/${notaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, nota }),
            });
            if (!response.ok)
                throw new Error('Error al actualizar la nota');
            setSuccess('Nota actualizada con éxito.');
            onUpdateSuccess();
            onClose(); // Cierra el modal
        }
        catch (err) {
            setError('Error al actualizar la nota.');
        }
    };
    return (_jsxs(Dialog, { open: true, onClose: onClose, className: "relative z-10", children: [_jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }), _jsx("div", { className: "fixed inset-0 z-10 flex items-center justify-center p-4", children: _jsx(Dialog.Panel, { className: "relative w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl transition-all", children: _jsxs("form", { onSubmit: handleUpdate, className: "flex flex-col items-center justify-center p-6 space-y-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Actualizar Nota" }), _jsxs("div", { className: "w-full", children: [_jsx("label", { htmlFor: "nombre", className: "block text-sm font-medium text-gray-700", children: "Nombre de la Nota" }), _jsx("input", { id: "nombre", type: "text", value: nombre, onChange: (e) => setNombre(e.target.value), placeholder: "Ingrese el nombre de la nota", className: "mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" })] }), _jsxs("div", { className: "w-full", children: [_jsx("label", { htmlFor: "nota", className: "block text-sm font-medium text-gray-700", children: "Descripci\u00F3n de la Nota" }), _jsx("textarea", { id: "nota", value: nota, onChange: (e) => setNota(e.target.value), placeholder: "Escribe tu nota aqu\u00ED", className: "mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm", rows: 4 })] }), error && _jsx("p", { className: "text-red-500 text-center", children: error }), success && _jsx("p", { className: "text-green-500 text-center", children: success }), _jsxs("div", { className: "flex w-full justify-center space-x-4", children: [_jsx("button", { type: "submit", className: "inline-flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none", children: "Actualizar" }), _jsx("button", { type: "button", onClick: onClose, className: "inline-flex w-full justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 focus:outline-none", children: "Cancelar" })] })] }) }) })] }));
};
export default Actualizar;
