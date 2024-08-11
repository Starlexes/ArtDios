

import styles from './ProductItemPrice.module.css';
import { ProductItemPriceProps } from './ProductItemPrice.props';
import cn from 'classnames';

function ProductItemPrice({price, newPrice, className }: ProductItemPriceProps) {
	
	const formattedPrice = price.toLocaleString('ru-RU');
	
	
	return (
		
		<div className={cn(styles['product-price'], className)}>
			
				
			<span className={cn(styles['price'])}>{newPrice? newPrice.toLocaleString('ru-RU') : formattedPrice} &#8381;</span>

			{newPrice && 
					<span className={cn(styles['old-price'])}>{formattedPrice} &#8381;</span>
			}
				
		</div>
		

	);
}

export default ProductItemPrice;