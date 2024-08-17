import styles from './ProductCardTitle.module.css';
import cn from 'classnames';
import { ProductCardTitleProps } from './ProductCardTitle.props';

function ProductCardTitle({className, children}: ProductCardTitleProps) {

	return (	
		<h3 className={cn(styles['title-card'], className)}>{children}</h3>
	);
}

export default ProductCardTitle;