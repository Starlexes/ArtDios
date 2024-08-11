import Input from '../../Header/Input/Input';
import styles from './ModalInput.module.css';
import { ModalInputProps } from './ModalInput.props';
import cn from 'classnames';

function ModalInput({hasError=false, className, name, onInput, onChange, placeholder, type}: ModalInputProps) {

	return (
		<Input onInput={onInput} name={name} onChange={onChange} type={type} placeholder={placeholder} className={cn(styles['modal-input'], {
			[styles['modal-checkbox']]: type==='checkbox',
			[styles['error']]: hasError,
			[styles['modal-checkbox-error']]: hasError && (type==='checkbox')
		}, className)}/>
	);
}


export default ModalInput;