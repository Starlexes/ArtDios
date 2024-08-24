
import styles from './ProductCarts.module.css';
import { ProductCartsProps } from './ProductCarts.props';
import 'swiper/swiper-bundle.css';
import cn from 'classnames';



function ProductCarts({children, className }: ProductCartsProps) {

	return (		
		<div className={cn(styles['product-carts'], className)}>	
			{children}
		</div>
	);

}

export default ProductCarts;