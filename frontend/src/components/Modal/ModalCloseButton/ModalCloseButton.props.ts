import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ModalCloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode
}