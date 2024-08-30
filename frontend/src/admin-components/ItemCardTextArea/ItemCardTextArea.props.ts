import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';

export interface ItemCardTextAreaProps extends InputHTMLAttributes<HTMLDivElement> {
    content: string,
    onChangeContent?: Dispatch<SetStateAction<string>>,
    errors?: boolean
}