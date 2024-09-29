'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

export default function NotaModal() {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  // Obtener el usuarioId del localStorage al cargar el componente
  useEffect(() => {
    const id = localStorage.getItem('usuarioId');

    setUsuarioId(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usuarioId) {
      setError('ID de usuario no disponible. Por favor inicia sesión nuevamente.');
      return;
    }
    
    // Verifica si los campos están vacíos
    if (!nombre || !nota || !usuarioId) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${import.meta.env.VITE_URL_web}/notasCrear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, nota, usuarioId }),
      });

      if (!response.ok) {
        setError('No se pudo guardar su nota');
        return;
      }

      const data = await response.json();
      setSuccess('Nota guardada con éxito');
      setNota('');
      setNombre('');

      // Recargar la página 
      setTimeout(() => {
        window.location.reload();
      }, 100); 
      
    } catch (err) {
      console.error(err);
      setError('No se pudo guardar su nota');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-500 focus:outline-none"
      >
        Crear Nota
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <Dialog.Panel className="relative w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl transition-all">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Crear Nota</h2>

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
              {usuarioId && <p className="text-gray-600">ID de usuario: {usuarioId}</p>} 

              <div className="flex w-full justify-center space-x-4">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 focus:outline-none"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
