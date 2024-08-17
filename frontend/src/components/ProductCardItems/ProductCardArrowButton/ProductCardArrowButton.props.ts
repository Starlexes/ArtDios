import { ButtonHTMLAttributes} from 'react';


export interface ProductCardArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    typeArrow: 'left' | 'right'
}