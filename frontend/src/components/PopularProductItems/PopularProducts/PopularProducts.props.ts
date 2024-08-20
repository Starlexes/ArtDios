import { HTMLProps } from 'react';
import { PopularProduct } from '../../../slices/popularProductSlice';
import { CategoryState } from '../../../slices/categorySlice';

export interface PopularProductsProps extends HTMLProps<HTMLDivElement>{
    popProducts: PopularProduct[],
    category: (CategoryState | null)[]
}