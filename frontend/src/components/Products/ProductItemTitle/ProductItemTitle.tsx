
import styles from './ProductItemTitle.module.css';
import { ProductItemTitleProps } from './ProductItemTitle.props';
import cn from 'classnames';

function ProductItemTitle({title, className }: ProductItemTitleProps) {
	return (
		<span className={cn(styles['product-title'], className)}>
			{title}
		</span>
	);
}

export default ProductItemTitle;