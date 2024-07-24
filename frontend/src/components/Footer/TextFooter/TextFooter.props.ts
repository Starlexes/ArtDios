import {HTMLProps, ReactNode } from 'react';

export interface TextFooterProps extends HTMLProps<HTMLSpanElement> {
    children: ReactNode;
}