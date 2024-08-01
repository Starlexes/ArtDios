import styles from './Input.module.css';
import { InputProps } from './Input.props';
import cn from 'classnames';

function Input({onChange, onInput, name, className, hasError=false, ...props}: InputProps) {
	return (
		<input className={cn({

			[styles['modal-input']]: className === 'modal-input',
			[styles['modal-checkbox']]: className === 'modal-checkbox',
			[styles['error']]: hasError,
			[styles['modal-checkbox-error']]: hasError && ( className === 'modal-checkbox')
		}, className)} onChange={onChange} onInput={onInput} {...props} name={name} />
	);
}

export default Input;