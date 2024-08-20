import styles from './PopularProductItems.module.css';
import { PopularProductItemsProps } from './PopularProductItems.props';
import cn from 'classnames';


function PopularProductItems({children, className }: PopularProductItemsProps) {
	
	return (	
		<div className={cn(styles['product-items'], className)}>
			{children}
		</div>	
	);

}

export default PopularProductItems;