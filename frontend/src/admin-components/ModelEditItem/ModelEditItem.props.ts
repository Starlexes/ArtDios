import { HTMLProps } from 'react';
import { ProductType } from '../../slices/productTypeSlice';
import { CategoryState, SubCategoryState } from '../../slices/categorySlice';

type ModelItem = SubCategoryState | ProductType | CategoryState

export interface ModelEditItemProps extends HTMLProps<HTMLDivElement>{
    modelItem: ModelItem,
    onClickAccept: (id: number | undefined, name: string) => void,
    onClickDelete: (id: number) => void,
    showToggleItem: (id: number | undefined, isShow: boolean) => void,
    onClickDiscount?: (id: number | undefined, discount: number | null) => void
}