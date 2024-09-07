import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ItemActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    roleAction?: 'accept' | 'delete' | 'static'
}