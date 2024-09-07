
import { useNavigate } from 'react-router-dom';
import AddItemButton from '../../../admin-components/AddItemButton/AddItemButton';
import useScrollToTop from '../../../hooks/useScrollToTop';
import { addItemPlus, adminCreateNewCard, adminEditCatalog, adminHomeRoute, adminRoute } from '../../../utils/constants';
import ProductListItem from '../ProductListItem/ProductListItem';
import styles from './ProductList.module.css';
import { ProductListProps } from './ProductList.props';
import cn from 'classnames';

function ProductList({products, className, isAdmin=false,
	removeProductDelete, addProductDelete, isSearching,
	addProductCount, subProductCount }: ProductListProps) {

	useScrollToTop();
	const navigate = useNavigate();

	const onClickNewProduct = () => {
		navigate(adminRoute+adminHomeRoute+adminEditCatalog+adminCreateNewCard);
	};
	
	return (
		<div className={cn(styles['products-list'], className)}>
			{	isAdmin &&
				<div className={cn(styles['add-product'])}>
					<AddItemButton shape='circle' className={cn(styles['action-btn'])} onClick={onClickNewProduct}>
						{addItemPlus()}
					</AddItemButton>
				</div>
			}
			{
				products.map(product => (
					<div key={product.slug}>
						<ProductListItem product={product} isAdmin={isAdmin}
							addProductDelete={addProductDelete} removeProductDelete={removeProductDelete}
							isSearching={isSearching} addProductCount={addProductCount}
							subProductCount={subProductCount}/>
					</div>
				) )
			}
		</div>
	);
}

export default ProductList;