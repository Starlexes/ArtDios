import { HTMLProps } from 'react';

export interface ItemImagePreviewProps extends HTMLProps<HTMLDivElement>{
    image?: string | File | null,
    errors?: boolean
}