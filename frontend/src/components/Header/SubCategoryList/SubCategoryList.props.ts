import { HTMLProps, ReactNode } from 'react';


export interface SubCategoryListProps extends HTMLProps<HTMLDivElement> {
    className?: string | undefined,
    isActive?: boolean,
    children: ReactNode
}