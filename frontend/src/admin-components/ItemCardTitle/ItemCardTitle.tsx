import styles from './ItemCardTitle.module.css';
import { ItemCardTitleProps } from './ItemCardTitle.props';
import cn from 'classnames';


function ItemCardTitle({ className, children}: ItemCardTitleProps) {

	return (
		
		<h3 className={cn(styles['item-title'], className)}>		
			{children}		
		</h3>        
	);

}

export default ItemCardTitle;