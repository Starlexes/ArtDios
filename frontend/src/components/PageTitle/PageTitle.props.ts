import { HTMLProps, ReactNode } from 'react';

export interface PageTitleProps extends HTMLProps<HTMLHeadingElement>{
    children: ReactNode
}