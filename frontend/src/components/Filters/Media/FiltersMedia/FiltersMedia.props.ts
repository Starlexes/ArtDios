import { CharacteristicClient } from '../../../../slices/characteristicSlice';

export interface FiltersMediaProps {
    className?: string | undefined,
    isOpen: boolean,
    closeModal: () => void,
    chars: CharacteristicClient[],
    minPrice: string,
    maxPrice: string,
    productLength: number
}