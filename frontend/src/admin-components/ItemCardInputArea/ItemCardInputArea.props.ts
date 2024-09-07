import { HTMLProps, ReactNode } from 'react';

export interface ItemCardInputAreaProps extends HTMLProps<HTMLDivElement> {
    children: ReactNode,
    dark?: boolean
}