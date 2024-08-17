import { HTMLProps } from 'react';
import { Characteristic } from '../../../slices/characteristicSlice';

export interface ProductCardCharacteristicsProps extends HTMLProps<HTMLDivElement>{
    chars: Characteristic[];
}