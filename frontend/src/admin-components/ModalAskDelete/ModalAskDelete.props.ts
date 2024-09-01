import { HTMLProps } from 'react';

export interface ModalAskDeleteProps extends HTMLProps<HTMLDivElement> {
    className?: string | undefined,
    isOpen: boolean,
    closeModal: () => void,
    message: string,
    onDelete?: (id: number) => void,
    idItem: number | undefined
}