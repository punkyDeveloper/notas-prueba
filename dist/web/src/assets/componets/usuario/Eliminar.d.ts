import React from 'react';
interface EliminarProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}
declare const Eliminar: React.FC<EliminarProps>;
export default Eliminar;
