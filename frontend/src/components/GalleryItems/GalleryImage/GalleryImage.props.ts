import { HTMLProps, ReactNode } from 'react';
import { GalleryItemTypes } from '../GalleryItem/GalleryItem.props';

export interface GalleryImageProps extends HTMLProps<HTMLDivElement>{
    children: ReactNode,
    type: GalleryItemTypes
}