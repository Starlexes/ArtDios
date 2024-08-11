import { HTMLProps } from 'react';
import { Product } from '../../../slices/productSlice';


export interface ProductListProps extends HTMLProps<HTMLDivElement>{
    products: Product[]
}