import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Modal = ({ isOpen, onClose }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center", children: _jsxs("div", { className: "bg-white rounded-lg p-6 w-96", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Registro Exitoso" }), _jsx("p", { className: "mb-4", children: "Su registro fue exitoso. \u00A1Bienvenido!" }), _jsx("button", { onClick: onClose, className: "bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500", children: "Ir al Login" })] }) }));
};
export default Modal;
