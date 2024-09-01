import { HTMLProps} from 'react';

export interface CardEditItemProps extends HTMLProps<HTMLDivElement> {
    content?: string,
    onClickAccept?: (id: number | undefined, name: string) => void,
    onClickAdd?: (propery: string) => void
    onDelete?: (id: number) => void,
    onRemoveItem?: () => void,
    idItem?: number,
    deleteMessage?: string,
    placeholder?: string,
    newItem?: boolean
}