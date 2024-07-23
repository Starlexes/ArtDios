import styles from './Input.module.css';
import { InputProps } from './Input.props';
import cn from 'classnames';

function Input({className, ...props}: InputProps) {
	return (
		<input className={cn({
			[styles['search-input']]: className === 'search-input'
		})} {...props} />
	);
}

export default Input;