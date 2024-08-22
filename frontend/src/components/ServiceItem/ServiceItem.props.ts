import { HTMLProps, ReactNode } from 'react';

export interface ServiceItemProps extends HTMLProps<HTMLDivElement>{
    children: ReactNode,
}