import { ButtonHTMLAttributes } from 'react';

export interface SaveDeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    typeAction: 'accept' | 'delete'
}