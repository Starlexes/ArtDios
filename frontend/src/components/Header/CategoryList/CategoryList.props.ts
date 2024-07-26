import { HTMLProps } from 'react';


export interface CategoryListProps extends HTMLProps<HTMLDivElement> {
    className?: string | undefined,
    isActive: boolean,
}