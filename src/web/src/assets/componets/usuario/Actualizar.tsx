import { Dialog } from '@headlessui/react';
import React, { useState, useEffect } from 'react';

interface ActualizarProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    userName: string;
    userEmail: string;
    onConfirm: (id: string, nombre?: string, correo?: string, contrasena?: string) => Promise<void>; // Permite que los parámetros sean opcionales
}

const Actualizar: React.FC<ActualizarProps> = ({
    isOpen,
    onClose,
    userId,
    userName,
    userEmail,
    onConfirm,
}) => {
    const [nombre, setNombre] = useState(userName);
    const [correo, setCorreo] = useState(userEmail);
    const [contrasena, setContrasena] = useState('');

    useEffect(() => {
        setNombre(userName);
        setCorreo(userEmail);
    }, [userName, userEmail]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        await onConfirm(userId, nombre, correo, contrasena); // Llama a la función de confirmación
        onClose(); // Cerrar el modal después de la actualización
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                <Dialog.Panel className="relative w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                    <form onSubmit={handleUpdate} className="flex flex-col items-center justify-center p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900">Actualizar Usuario</h2>
                        <div className="w-full">
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                id="nombre"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Ingrese su nombre"
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                            <input
                                id="correo"
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                placeholder="Ingrese su correo electrónico"
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña (opcional)</label>
                            <input
                                id="contrasena"
                                type="password"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                placeholder="Ingrese una nueva contraseña"
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex w-full justify-center space-x-4">
                            <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Actualizar
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default Actualizar;
