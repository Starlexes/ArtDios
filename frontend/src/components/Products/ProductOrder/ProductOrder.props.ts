
import { ButtonHTMLAttributes, ReactNode } from 'react';


export interface ProductOrderProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    onClickProductOrder?: () => void,
    commentPlaceholder?: string
}