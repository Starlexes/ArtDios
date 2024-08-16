import { HTMLProps } from 'react';
import { CharacteristicClient } from '../../../../slices/characteristicSlice';

export interface FiltersButtonProps extends HTMLProps<HTMLButtonElement>{
    chars: CharacteristicClient[],
    minPrice: string,
    maxPrice: string
}