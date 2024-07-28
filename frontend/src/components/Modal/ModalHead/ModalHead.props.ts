import { HTMLProps } from 'react';

export  interface ModalHeadProps extends HTMLProps<HTMLDivElement> {
    modalTitle: string,
    modalText: string,
    textClass: string
}