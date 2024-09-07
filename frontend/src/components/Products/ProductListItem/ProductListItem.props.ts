import { HTMLProps } from 'react';
import { Product } from '../../../slices/productSlice';


export interface ProductListItemProps extends HTMLProps<HTMLDivElement>{
    product: Product,
    isAdmin?: boolean,
    addProductDelete?: (id: number) => void,
    removeProductDelete?: (id: number) => void,
    isSearching?: boolean,
    addProductCount?: () => void,
    subProductCount?: () => void
}