import React, { useEffect, useState } from 'react';
import Eliminar from './eliminar';
import Actualizar from './actualizar';

interface Nota {
  _id: string;
  nombre: string;
  nota: string;
}

export default function Notas() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [notaIdToDelete, setNotaIdToDelete] = useState<string | null>(null);
  const [notaIdToUpdate, setNotaIdToUpdate] = useState<string | null>(null);
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
        } catch (error) {
          console.error('Error al obtener las notas:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNotas();
  }, [usuarioId]);

  const handleOpenDeleteModal = (notaId: string) => {
    setNotaIdToDelete(notaId);
    setIsDeleteModalOpen(true);
  };

  const handleOpenUpdateModal = (notaId: string) => {
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
        } catch (error) {
          console.error('Error al obtener las notas:', error);
        }
      }
    };
    fetchNotas();
    setIsUpdateModalOpen(false);
    setNotaIdToUpdate(null);
  };

  if (loading) {
    return <div>Cargando notas...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center p-4">
      {notas.map((nota) => (
        <div key={nota._id} className="w-64 h-64 rounded-lg overflow-hidden shadow-lg m-2 bg-white flex flex-col">
          <div className="p-4 flex-grow">
            <h2 className="font-bold text-xl mb-2">{nota.nombre}</h2>
            <p className="text-gray-700 text-base h-24 overflow-y-auto">{nota.nota}</p>
          </div>
          <div className="flex justify-between p-4 bg-gray-100">
            <button
              onClick={() => handleOpenUpdateModal(nota._id)}
              className="bg-blue-500 text-white py-1 px-3 rounded"
            >
              Actualizar
            </button>
            <button
              onClick={() => handleOpenDeleteModal(nota._id)}
              className="bg-red-500 text-white py-1 px-3 rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {/* Componente de Modal para eliminar */}
      {isDeleteModalOpen && (
        <Eliminar
          notaId={notaIdToDelete!} // El ID de la nota a eliminar
          onDeleteSuccess={handleDeleteSuccess}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}

      {/* Componente de Modal para actualizar */}
      {isUpdateModalOpen && notaIdToUpdate && (
        <Actualizar
          notaId={notaIdToUpdate}
          onUpdateSuccess={handleUpdateSuccess}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
    </div>
  );
}
