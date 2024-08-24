
import styles from './ProductCartsTitle.module.css';
import { ProductCartsTitleProps } from './ProductCartsTitle.props';
import cn from 'classnames';

function ProductCartsTitle({children, className }: ProductCartsTitleProps) {

	return (		
		<h3 className={cn(styles['item-carts-title'], className)}>																	
			{children}							
		</h3>
	);

}

export default ProductCartsTitle;