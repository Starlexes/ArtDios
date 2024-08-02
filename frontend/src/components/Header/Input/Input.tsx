
import { InputProps } from './Input.props';
import cn from 'classnames';

function Input({onChange, onInput, name, className, ...props}: InputProps) {
	return (
		<input className={cn(className)} onChange={onChange} onInput={onInput} {...props} name={name} />
	);
}

export default Input;