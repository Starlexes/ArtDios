import { ReactNode } from 'react';

export interface CategoryListItemProps {
    className?: string | undefined,
    children: ReactNode,
    link: string,
    subcategory?: ReactNode,
    showSub?: boolean | undefined,
    name?: string |undefined,
    onMouseEnter?: ((name: string | undefined) => void) | undefined,
    onMouseLeave?: () => void,
}