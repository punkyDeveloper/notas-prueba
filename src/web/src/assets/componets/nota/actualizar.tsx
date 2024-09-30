import { Dialog } from '@headlessui/react';
import React, { useEffect, useState } from 'react';

interface ActualizarProps {
  notaId: string;
  onUpdateSuccess: () => void;
  onClose: () => void;
}

const Actualizar: React.FC<ActualizarProps> = ({ notaId, onUpdateSuccess, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const usuarioId = localStorage.getItem('usuarioId');

  useEffect(() => {
    const fetchNota = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL_web}/notas/nota/${notaId}`); 
        if (!response.ok) throw new Error('Error al obtener la nota');
        const data = await response.json();
        setNombre(data.nombre);
        setNota(data.nota);
      } catch (err) {
        setError('Error al cargar la nota.');
      }
    };

    fetchNota();
  }, [notaId]);

  const handleUpdate = async (e: React.FormEvent) => {
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

      if (!response.ok) throw new Error('Error al actualizar la nota');

      setSuccess('Nota actualizada con éxito.');
      onUpdateSuccess();
      onClose(); // Cierra el modal
    } catch (err) {
      setError('Error al actualizar la nota.');
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl transition-all">
          <form onSubmit={handleUpdate} className="flex flex-col items-center justify-center p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Actualizar Nota</h2>

            <div className="w-full">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre de la Nota
              </label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese el nombre de la nota"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full">
              <label htmlFor="nota" className="block text-sm font-medium text-gray-700">
                Descripción de la Nota
              </label>
              <textarea
                id="nota"
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                placeholder="Escribe tu nota aquí"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                rows={4}
              ></textarea>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>} 

            <div className="flex w-full justify-center space-x-4">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none"
              >
                Actualizar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex w-full justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 focus:outline-none"
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
