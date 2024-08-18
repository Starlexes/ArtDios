import { HTMLProps } from 'react';
import { Gallery } from '../../../slices/gallerySlice';

export type GalleryItemTypes = 'odd' | 'even'

export interface GalleryItemProps extends HTMLProps<HTMLDivElement>{
    gallery: Gallery,
    type: GalleryItemTypes
}