import styles from './Input.module.css';
import { InputProps } from './Input.props';
import cn from 'classnames';

function Input({className, ...props}: InputProps) {
	return (
		<input className={cn({
			[styles['search-input']]: className === 'search-input',
			[styles['modal-input']]: className === 'modal-input',
			[styles['modal-checkbox']]: className === 'modal-checkbox'
			
		})} {...props} />
	);
}

export default Input;