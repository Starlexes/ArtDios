import { HTMLProps } from 'react';


export interface ProductImageProps extends HTMLProps<HTMLDivElement>{
    path: string,
    name: string,
    promo: number | null
}