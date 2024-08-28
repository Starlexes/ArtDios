import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface AddItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    shape: 'circle' | 'rect'
}