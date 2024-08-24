import { FormHTMLAttributes } from 'react';
import { ErrorData } from '../ModalOrderCall/ModalOrderCall';

export interface ModalFormProps extends FormHTMLAttributes<HTMLFormElement> {
    errors: ErrorData,
    setErrors: (errors: ErrorData) => void,
    onClickClose: () => void
}