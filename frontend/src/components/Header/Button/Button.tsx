import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({children,className, isActive = false, ...props}: ButtonProps) {
	return (
		<button className={cn(styles['main-btn'], {
			[styles['order-btn']]: className === 'order-btn',
			[styles['catalog']]: className === 'catalog',
			[styles['close-modal']]: className === 'close-modal' || className === 'close-thank',
			[styles['close-thank']]: className === 'close-thank',
			[styles['submit']]: className === 'submit',
			[styles['active']]: isActive
		}, className)} {...props}>{children}</button>
	);
}

export default Button;