import React from 'react';
interface ActualizarProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    userName: string;
    userEmail: string;
    onConfirm: (id: string, nombre?: string, correo?: string, contrasena?: string) => Promise<void>;
}
declare const Actualizar: React.FC<ActualizarProps>;
export default Actualizar;
