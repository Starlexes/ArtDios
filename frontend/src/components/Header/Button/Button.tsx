import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({children,className, ...props}: ButtonProps) {
	return (
		<button className={cn({
			[styles['order-btn']]: className === 'order-btn',
			[styles['search-btn']]: className === 'search-btn',
			[styles['catalog']]: className === 'catalog'
		})} {...props}>{children}</button>
	);
}

export default Button;