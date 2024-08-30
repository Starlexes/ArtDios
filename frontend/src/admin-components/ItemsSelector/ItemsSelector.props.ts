import { HTMLProps } from 'react';
import { SingleValue } from 'react-select';
import { OptionType } from '../../components/Filters/Media/SortingOrderMedia/SortingOrderMedia';

export interface OptionItems {
    name: string,
    id: number
}

export interface ItemsSelectorProps extends HTMLProps<HTMLSelectElement> {
    defaultOption: string,
    optionLabels: OptionItems[],
    onChangeOption: (option: SingleValue<OptionType>) => void,
    selectErrors?: boolean
}