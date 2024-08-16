import { HTMLProps } from 'react';
import { CharacteristicClient } from '../../../slices/characteristicSlice';


export interface PropertyFilterProps  extends HTMLProps<HTMLDivElement>{
    item: CharacteristicClient,
    decsParams: string[]
}