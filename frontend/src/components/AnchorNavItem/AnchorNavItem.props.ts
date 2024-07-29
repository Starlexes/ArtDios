import { AnchorHTMLAttributes, ReactNode } from 'react';

export interface AnchorNavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode
}