
import PromoLabel from '../PromoLabel/PromoLabel';
import styles from './ProductImage.module.css';
import { ProductImageProps } from './ProductImage.props';
import cn from 'classnames';

function ProductImage({path, name,className, promo }: ProductImageProps) {
	return (
		<div className={cn(styles['product-image'], className)}>
			
			<img src={path} alt={name} loading='lazy'/>

			{promo && 
				<PromoLabel/>
			}
		</div>
	);
}

export default ProductImage;