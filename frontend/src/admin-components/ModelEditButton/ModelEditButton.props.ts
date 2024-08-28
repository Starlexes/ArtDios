import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ModelEditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    typeAction: 'main' | 'delete'
}