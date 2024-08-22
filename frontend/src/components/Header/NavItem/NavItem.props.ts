import { ReactNode} from 'react';
import { LinkProps } from 'react-router-dom';

export interface NavItemProps extends LinkProps {
    children: ReactNode,
    isHashLink?: boolean
}