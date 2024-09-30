import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Eliminar from './eliminar';
import Actualizar from './actualizar';
export default function Notas() {
    const [notas, setNotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [notaIdToDelete, setNotaIdToDelete] = useState(null);
    const [notaIdToUpdate, setNotaIdToUpdate] = useState(null);
    const usuarioId = localStorage.getItem('usuarioId');
    useEffect(() => {
        const fetchNotas = async () => {
            if (usuarioId) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_URL_web}/notas/usuario/${usuarioId}`);
                    if (!response.ok) {
                        throw new Error('Error al obtener las notas');
                    }
                    const data = await response.json();
                    setNotas(data);
                }
                catch (error) {
                    console.error('Error al obtener las notas:', error);
                }
                finally {
                    setLoading(false);
                }
            }
        };
        fetchNotas();
    }, [usuarioId]);
    const handleOpenDeleteModal = (notaId) => {
        setNotaIdToDelete(notaId);
        setIsDeleteModalOpen(true);
    };
    const handleOpenUpdateModal = (notaId) => {
        setNotaIdToUpdate(notaId);
        setIsUpdateModalOpen(true);
    };
    const handleDeleteSuccess = () => {
        setNotas((prevNotas) => prevNotas.filter((nota) => nota._id !== notaIdToDelete));
        setNotaIdToDelete(null);
        setIsDeleteModalOpen(false);
    };
    const handleUpdateSuccess = () => {
        // Refrescar la lista de notas después de la actualización
        const fetchNotas = async () => {
            if (usuarioId) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_URL_web}/notas/usuario/${usuarioId}`);
                    const data = await response.json();
                    setNotas(data);
                }
                catch (error) {
                    console.error('Error al obtener las notas:', error);
                }
            }
        };
        fetchNotas();
        setIsUpdateModalOpen(false);
        setNotaIdToUpdate(null);
    };
    if (loading) {
        return _jsx("div", { children: "Cargando notas..." });
    }
    return (_jsxs("div", { className: "flex flex-wrap justify-center p-4", children: [notas.map((nota) => (_jsxs("div", { className: "w-64 h-64 rounded-lg overflow-hidden shadow-lg m-2 bg-white flex flex-col", children: [_jsxs("div", { className: "p-4 flex-grow", children: [_jsx("h2", { className: "font-bold text-xl mb-2", children: nota.nombre }), _jsx("p", { className: "text-gray-700 text-base h-24 overflow-y-auto", children: nota.nota })] }), _jsxs("div", { className: "flex justify-between p-4 bg-gray-100", children: [_jsx("button", { onClick: () => handleOpenUpdateModal(nota._id), className: "bg-blue-500 text-white py-1 px-3 rounded", children: "Actualizar" }), _jsx("button", { onClick: () => handleOpenDeleteModal(nota._id), className: "bg-red-500 text-white py-1 px-3 rounded", children: "Eliminar" })] })] }, nota._id))), isDeleteModalOpen && (_jsx(Eliminar, { notaId: notaIdToDelete, onDeleteSuccess: handleDeleteSuccess, onClose: () => setIsDeleteModalOpen(false) })), isUpdateModalOpen && notaIdToUpdate && (_jsx(Actualizar, { notaId: notaIdToUpdate, onUpdateSuccess: handleUpdateSuccess, onClose: () => setIsUpdateModalOpen(false) }))] }));
}
