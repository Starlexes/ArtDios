import styles from './PopularProductItem.module.css';
import { PopularProductItemProps } from './PopularProductItem.props';
import cn from 'classnames';


function PopularProductItem({children, className }: PopularProductItemProps) {
	
	return (	
		<div className={cn(styles['product-item'], className)}>
			{children}
		</div>	
	);

}

export default PopularProductItem;