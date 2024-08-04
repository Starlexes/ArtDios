import { HTMLProps } from 'react';

export interface ModalCatalogHeadProps extends HTMLProps<HTMLDivElement> {
    onClose: () => void
}