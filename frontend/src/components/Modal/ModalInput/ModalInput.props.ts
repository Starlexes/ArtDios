import { InputHTMLAttributes } from 'react';

export interface ModalInputProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean
}