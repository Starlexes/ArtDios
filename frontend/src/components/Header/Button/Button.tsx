import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({children,className, isActive = false, isProduct, ...props}: ButtonProps) {
	return (
		<button className={cn(styles['main-btn'], {
			[styles['order-btn']]: className === 'order-btn' || isProduct,
			[styles['catalog']]: className === 'catalog',
			[styles['active']]: isActive
		}, className)} {...props}>{children}</button>
	);
}

export default Button;