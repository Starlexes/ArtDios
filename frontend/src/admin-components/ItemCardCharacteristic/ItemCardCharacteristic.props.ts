import { HTMLProps } from 'react';


export interface ItemCardCharacteristicProps extends HTMLProps<HTMLDivElement>{
    orderNumber: number,
    charItem?: {property: string, value: string, id: number, new?: boolean, update?: boolean},
    acceptClicked?: boolean,
    onChangeChars: (index: number, field: 'property' | 'value', value: string) => void,
    onClickDelete?: (id: number) => void,
    onDeleteCharacteristic?: (id: number) => void,
    existChar?: boolean
}