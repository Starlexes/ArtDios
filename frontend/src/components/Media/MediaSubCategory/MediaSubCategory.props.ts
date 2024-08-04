import { HTMLProps} from 'react';
import { SubCategoryState } from '../../../slices/categorySlice';


export interface MediaSubCategoryProps extends HTMLProps<HTMLDivElement> {
    isOpen: boolean,
    subcategory: SubCategoryState[] | null,
    category: string | null,
    onClose: () => void,
    onCloseCategory: () => void
}