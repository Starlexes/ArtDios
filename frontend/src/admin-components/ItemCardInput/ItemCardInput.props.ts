import { InputHTMLAttributes } from 'react';

export interface ItemCardInputProps extends InputHTMLAttributes<HTMLInputElement> {
    errors?: boolean,
    dark?: boolean
}