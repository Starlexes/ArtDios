import { InputHTMLAttributes } from 'react';

export interface CheckBoxFilterProps extends InputHTMLAttributes<HTMLInputElement> {
    desc: string,
    propertyName: string,
    isCategory?: boolean
}