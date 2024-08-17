
import styles from './ProductCardImage.module.css';
import { ProductCardImageProps } from './ProductCardImage.props';
import cn from 'classnames';

function ProductCardImage({className, children}: ProductCardImageProps) {
	return (
			
		<div className={cn(styles['card-images'], className)}>
			{children}
		</div>

	);
}

export default ProductCardImage;