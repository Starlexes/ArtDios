import { HTMLProps } from 'react';
import { CharacteristicClient } from '../../../slices/characteristicSlice';


export interface CharsFilterProps extends HTMLProps<HTMLDivElement>{
    chars: CharacteristicClient[],
    minPrice: string,
    maxPrice: string,
    closeModal?: () => void,
    productLength: number
}