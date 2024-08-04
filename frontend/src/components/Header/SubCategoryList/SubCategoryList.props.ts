import { HTMLProps, ReactNode } from 'react';


export interface SubCategoryListProps extends HTMLProps<HTMLDivElement> {
    isActive?: boolean,
    children: ReactNode
}