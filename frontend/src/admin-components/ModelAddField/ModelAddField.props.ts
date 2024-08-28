import { HTMLProps } from 'react';
import { ProductType } from '../../slices/productTypeSlice';
import { CategoryState } from '../../slices/categorySlice';

export interface ModelAddFieldProps extends HTMLProps<HTMLDivElement> {
    onClickSubmit: (name: string, parent: number | null) => void,
    onClickAdd: () => void,
    productTypes?: ProductType[] | CategoryState[] | null,
    categories?: CategoryState[] | null
}