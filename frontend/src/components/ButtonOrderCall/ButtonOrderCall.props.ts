import { ButtonHTMLAttributes } from 'react';


export interface ButtonOrderCallProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isProduct?: boolean | undefined,
    onClickProductOrder?: () => void,
    commentPlaceholder?: string
}

