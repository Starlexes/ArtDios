import { HTMLProps } from 'react';
import { Promotion } from '../../../slices/promotionSlice';

export interface PromotionItemsProps extends HTMLProps<HTMLDivElement>{
    promotions: Promotion[]
}