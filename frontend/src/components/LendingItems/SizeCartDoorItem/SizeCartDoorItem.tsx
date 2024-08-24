
import styles from './SizeCartDoorItem.module.css';
import { SizeCartDoorItemProps } from './SizeCartDoorItem.props';
import cn from 'classnames';

function SizeCartDoorItem({children, className }: SizeCartDoorItemProps) {

	return (		
		<div className={cn(styles['size-cart-door'], className)}>																	
			{children}							
		</div>
	);

}

export default SizeCartDoorItem;