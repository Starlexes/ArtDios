import { HTMLProps } from 'react';


export interface PaginationProps  extends HTMLProps<HTMLDivElement>{
    url: string,
    currentPage: number,
    totalPages: number,
    params: string
}