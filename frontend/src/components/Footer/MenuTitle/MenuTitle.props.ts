import {  HTMLProps, ReactNode } from 'react';

export interface MenuTitleProps extends HTMLProps<HTMLSpanElement> {
    children: ReactNode
}