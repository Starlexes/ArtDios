import { HTMLProps } from 'react';
import { CharacteristicClient } from '../../../slices/characteristicSlice';
import { CategoryState } from '../../../slices/categorySlice';


export interface PropertyFilterProps  extends HTMLProps<HTMLDivElement>{
    item?: CharacteristicClient,
    category?: CategoryState[]
}