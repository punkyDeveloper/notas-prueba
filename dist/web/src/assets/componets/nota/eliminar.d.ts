import React from 'react';
interface EliminarProps {
    notaId: string;
    onDeleteSuccess: () => void;
    onClose: () => void;
}
declare const Eliminar: React.FC<EliminarProps>;
export default Eliminar;
