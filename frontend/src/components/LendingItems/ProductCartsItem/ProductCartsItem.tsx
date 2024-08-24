
import styles from './ProductCartsItem.module.css';
import { ProductCartsItemProps } from './ProductCartsItem.props';
import cn from 'classnames';

function ProductCartsItem({children, className, style }: ProductCartsItemProps) {

	return (		
		<div className={cn(styles['item-cart'], className)} style={style}>																	
			{children}							
		</div>
	);

}

export default ProductCartsItem;