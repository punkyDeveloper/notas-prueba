import React from 'react';
import { Dialog } from '@headlessui/react';

interface EliminarProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void; // Cambiado a no recibir argumentos
}

const Eliminar: React.FC<EliminarProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                <Dialog.Panel className="relative w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900">Eliminar Cuenta</h2>
                        <p className="mt-2 text-gray-600">¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button onClick={onClose} className="inline-flex justify-center rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-400">
                                Cancelar
                            </button>
                            <button onClick={onConfirm} className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default Eliminar;
