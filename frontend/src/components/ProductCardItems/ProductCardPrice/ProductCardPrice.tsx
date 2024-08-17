import styles from './ProductCardPrice.module.css';
import cn from 'classnames';
import { ProductCardPriceProps } from './ProductCardPrice.props';

function ProductCardPrice({className, children}:ProductCardPriceProps) {

	return (	
		<div className={cn(styles['price-card'], className)}>
			<span className={cn(styles['price-value'])}>{children} ₽</span>
			<span className={cn(styles['price-count'])}>за 1 шт.</span>
		</div>
		
	);
}

export default ProductCardPrice;