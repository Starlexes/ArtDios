import { HTMLProps, ReactNode } from 'react';

export interface MediaCategoryItemProps extends HTMLProps<HTMLDivElement> {
    children: ReactNode,
    link?: string,
    subcategory?: ReactNode,
    showSub?: boolean,
    borderItem: boolean
}