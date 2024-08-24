
import useScrollToTop from '../../../hooks/useScrollToTop';
import ProductListItem from '../ProductListItem/ProductListItem';
import styles from './ProductList.module.css';
import { ProductListProps } from './ProductList.props';
import cn from 'classnames';

function ProductList({products, className }: ProductListProps) {

	useScrollToTop();
	
	return (
		<div className={cn(styles['products-list'], className)}>
			{
				products.map(product => (
					<div key={product.slug}>
						<ProductListItem product={product}/>
					</div>
				) )
			}
		</div>
	);
}

export default ProductList;