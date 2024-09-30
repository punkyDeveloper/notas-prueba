import React from 'react';
import { Dialog } from '@headlessui/react';

interface EliminarProps {
  notaId: string;
  onDeleteSuccess: () => void; // Callback para actualizar la lista de notas
  onClose: () => void; // Callback para cerrar la modal
}

const Eliminar: React.FC<EliminarProps> = ({ notaId, onDeleteSuccess, onClose }) => {
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl transition-all">
          <div className="p-6">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              ¿Estás seguro de eliminar esta nota?
            </Dialog.Title>
            <div className="mt-4">
              <p className="text-gray-600">Esta acción no se puede deshacer.</p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none"
              >
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
