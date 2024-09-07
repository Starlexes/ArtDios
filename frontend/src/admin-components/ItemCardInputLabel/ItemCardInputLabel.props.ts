import { HTMLProps, ReactNode } from 'react';

export interface ItemCardInputLabelProps extends HTMLProps<HTMLLabelElement> {
    children: ReactNode,
    dark?: boolean
}