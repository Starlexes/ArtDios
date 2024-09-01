import { HTMLProps} from 'react';
import { WorkingHours } from '../../slices/workingHours';

export interface CardEditTimeProps extends HTMLProps<HTMLDivElement> {
    newItem?: boolean,
    hoursItem?: WorkingHours,
    onClickAccept?: (id?: number, openHours?: string , closeHours?: string) => void,
    onClickAddItem?: (openHours: string, closeHours: string) => void
}