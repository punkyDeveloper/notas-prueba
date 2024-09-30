import React from 'react';
const Modal = ({ isOpen, onClose }) => {
    if (!isOpen)
        return null;
    return (React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" },
        React.createElement("div", { className: "bg-white rounded-lg p-6 w-96" },
            React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Registro Exitoso"),
            React.createElement("p", { className: "mb-4" }, "Su registro fue exitoso. \u00A1Bienvenido!"),
            React.createElement("button", { onClick: onClose, className: "bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500" }, "Ir al Login"))));
};
export default Modal;
