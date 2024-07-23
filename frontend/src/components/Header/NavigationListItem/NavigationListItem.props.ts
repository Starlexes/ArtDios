import { LiHTMLAttributes, ReactNode } from 'react';

export interface NavigationListItemProps extends LiHTMLAttributes<HTMLLIElement>{
    children: ReactNode;
}