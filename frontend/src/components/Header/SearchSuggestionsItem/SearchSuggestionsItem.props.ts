import { HTMLProps, ReactNode } from 'react';
import { Suggestion } from '../Search/Search';

export interface SearchSuggestionsItemProps extends HTMLProps<HTMLDivElement>{
    children: ReactNode,
    link: string,
    onClickLink: (value: string) => void,
    suggestItem: Suggestion
}