import { HTMLProps } from 'react';

export interface ModalCatalogBodyProps extends HTMLProps<HTMLDivElement> {
    onClose: () => void
}