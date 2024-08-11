import { HTMLProps } from 'react';
import { Product } from '../../../slices/productSlice';


export interface ProductListItemProps extends HTMLProps<HTMLDivElement>{
    product: Product
}