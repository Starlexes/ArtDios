import styles from './ProductCardDesc.module.css';
import cn from 'classnames';
import { ProductCardDescProps } from './ProductCardDesc.props';

function ProductCardDesc({className, children}: ProductCardDescProps) {

	return (	
		<p className={cn(styles['desc-card'], className)}>{children}</p>
	);
}

export default ProductCardDesc;