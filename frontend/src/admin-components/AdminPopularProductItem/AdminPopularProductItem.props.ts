import { HTMLProps, ReactNode } from 'react';

export interface AdminPopularProductItemProps extends HTMLProps<HTMLDivElement> {
    children: ReactNode,
    active: boolean
}