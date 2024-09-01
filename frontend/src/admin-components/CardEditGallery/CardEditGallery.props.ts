import { HTMLProps} from 'react';
import { Gallery } from '../../slices/gallerySlice';


export interface CardEditGalleryProps extends HTMLProps<HTMLDivElement> {
    newItem?: boolean,
    onClickAccept?: (id:number, name?: string, description?: string, image?: File | null) => void,
    onClickAddItem?: (name: string, description: string, image: File | null) => void,
    onDelete?: (id: number) => void,
    onClickAdd?: () => void
    galleryItem?: Gallery
}