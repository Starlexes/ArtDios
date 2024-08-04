import { HTMLProps } from 'react';

export interface MediaCategoryProps extends HTMLProps<HTMLDivElement> {
    onClose: () => void
}