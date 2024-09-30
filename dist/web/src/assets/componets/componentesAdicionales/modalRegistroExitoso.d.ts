import React from 'react';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}
declare const Modal: React.FC<ModalProps>;
export default Modal;
