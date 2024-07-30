import { HTMLProps, ReactNode } from 'react';

export interface NavigationListProps extends HTMLProps<HTMLDivElement>{
    className?: string | undefined,
    children: ReactNode
}