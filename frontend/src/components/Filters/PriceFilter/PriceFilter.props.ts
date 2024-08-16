import { HTMLProps } from 'react';



export interface PriceFilterProps extends HTMLProps<HTMLDivElement>{
    minVal: string,
    maxVal: string,
    maxPriceSearch: string | null,
    minPriceSearch: string | null
}