import { HTMLProps, ReactNode } from 'react';
import { To } from 'react-router-dom';

export interface ModelItemProps extends HTMLProps<HTMLDivElement>{
    children: ReactNode,
    link: To,
    linkClassName?: string
}