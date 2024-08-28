import { ChangeEvent, HTMLProps } from 'react';

export interface AddPromoFieldProps extends HTMLProps<HTMLDivElement> {
    onClickSubmit: () => void,
    onClickAdd: () => void,
    onChangePromo: (e: ChangeEvent<HTMLInputElement>) => void
}