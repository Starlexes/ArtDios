import { HTMLProps } from 'react';
import { Product } from '../../../slices/productSlice';


export interface ProductListProps extends HTMLProps<HTMLDivElement>{
    products: Product[],
    isAdmin?: boolean,
    addProductDelete?: (id: number) => void,
    removeProductDelete?: (id: number) => void,
    isSearching?: boolean,
    addProductCount?: () => void,
    subProductCount?: () => void
}