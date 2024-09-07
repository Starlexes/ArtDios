import styles from './ItemCardTitle.module.css';
import { ItemCardTitleProps } from './ItemCardTitle.props';
import cn from 'classnames';


function ItemCardTitle({ className, children, dark=false}: ItemCardTitleProps) {

	return (
		
		<h3 className={cn(styles['item-title'], {
			[styles['dark']]: dark
		}, className)}>		
			{children}		
		</h3>        
	);

}

export default ItemCardTitle;