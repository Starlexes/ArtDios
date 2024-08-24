
import styles from './CartDoorItem.module.css';
import { CartDoorItemProps } from './CartDoorItem.props';
import cn from 'classnames';

function CartDoorItem({children, className }: CartDoorItemProps) {

	return (		
		<div className={cn(styles['cart-door'], className)}>																	
			{children}							
		</div>
	);

}

export default CartDoorItem;