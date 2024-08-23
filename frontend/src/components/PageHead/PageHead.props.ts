import { HTMLProps, ReactNode } from 'react';

export interface PageHeadProps extends HTMLProps<HTMLDivElement>{
    children: ReactNode,
    titleClassName?: string,
    onClickBack?: () => void
}