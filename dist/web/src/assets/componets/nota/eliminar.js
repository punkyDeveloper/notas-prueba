import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog } from '@headlessui/react';
const Eliminar = ({ notaId, onDeleteSuccess, onClose }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_web}/notas/${notaId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar la nota');
            }
            onDeleteSuccess(); // Llama a la función para actualizar la lista
            onClose(); // Cierra la modal
        }
        catch (error) {
            console.error('Error:', error);
        }
    };
    return (_jsxs(Dialog, { open: true, onClose: onClose, className: "relative z-10", children: [_jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }), _jsx("div", { className: "fixed inset-0 z-10 flex items-center justify-center p-4", children: _jsx(Dialog.Panel, { className: "relative w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl transition-all", children: _jsxs("div", { className: "p-6", children: [_jsx(Dialog.Title, { className: "text-lg font-semibold text-gray-900", children: "\u00BFEst\u00E1s seguro de eliminar esta nota?" }), _jsx("div", { className: "mt-4", children: _jsx("p", { className: "text-gray-600", children: "Esta acci\u00F3n no se puede deshacer." }) }), _jsxs("div", { className: "mt-6 flex justify-end space-x-4", children: [_jsx("button", { type: "button", onClick: onClose, className: "inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none", children: "Cancelar" }), _jsx("button", { type: "button", onClick: handleDelete, className: "inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none", children: "Eliminar" })] })] }) }) })] }));
};
export default Eliminar;
