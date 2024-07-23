import { AnchorHTMLAttributes, ReactNode } from 'react';

export interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode;
}