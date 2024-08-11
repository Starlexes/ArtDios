import { HTMLProps } from 'react';


export interface ProductItemPriceProps extends HTMLProps<HTMLDivElement>{
    price: number,
    newPrice: number | null
}