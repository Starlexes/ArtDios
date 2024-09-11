import { HTMLProps } from 'react';
import { CharacteristicClient } from '../../../slices/characteristicSlice';
import { CategoryState } from '../../../slices/categorySlice';

export interface CharsFilterProps extends HTMLProps<HTMLDivElement>{
    chars: CharacteristicClient[],
    minPrice: string,
    maxPrice: string,
    closeModal?: () => void,
    productLength: number,
    isAdmin?: boolean,
    category?: CategoryState[]
}