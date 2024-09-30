import React from 'react';
interface ActualizarProps {
    notaId: string;
    onUpdateSuccess: () => void;
    onClose: () => void;
}
declare const Actualizar: React.FC<ActualizarProps>;
export default Actualizar;
