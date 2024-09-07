import { HTMLProps } from 'react';

export interface ModalAskDeleteProps extends HTMLProps<HTMLDivElement> {
    className?: string,
    isOpen: boolean,
    closeModal: () => void,
    message: string,
    onDelete?: (id: number) => void,
    onDeleteMulty?: (ids: number[]) => void,
    idItem?: number,
    idsItems?: number[]
}