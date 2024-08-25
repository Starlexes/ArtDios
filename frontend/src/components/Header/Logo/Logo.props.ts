import { HTMLProps } from 'react';

export interface LogoProps extends HTMLProps<HTMLDivElement> {
    className?: string | undefined;
    isFooter?: boolean | undefined;
}