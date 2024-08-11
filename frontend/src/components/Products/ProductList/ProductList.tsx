
import ProductListItem from '../ProductListItem/ProductListItem';
import styles from './ProductList.module.css';
import { ProductListProps } from './ProductList.props';
import cn from 'classnames';

function ProductList({products, className }: ProductListProps) {
	return (
		<div className={cn(styles['products-list'], className)}>
			{
				products.map(product => (
					<ProductListItem key={product.slug} product={product}/>
				) )
			}
		</div>
	);
}

export default ProductList;