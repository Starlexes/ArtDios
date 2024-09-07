
import axios from 'axios';
import ProductImage from '../ProductImage/ProductImage';
import styles from './ProductListItem.module.css';
import { ProductListItemProps } from './ProductListItem.props';
import cn from 'classnames';
import ProductItemPrice from '../ProductItemPrice/ProductItemPrice';
import ProductItemTitle from '../ProductItemTitle/ProductItemTitle';
import ProductOrder from '../ProductOrder/ProductOrder';
import { useEffect, useState } from 'react';
import NavItem from '../../Header/NavItem/NavItem';
import { adminEditCatalog, adminEditProductCard, adminHomeRoute, adminRoute, commentPlaceholderOrderCall, products, selectedProductFlag } from '../../../utils/constants';
import { useMediaPredicate } from 'react-media-hook';

function ProductListItem({product, className, isAdmin=false,
	removeProductDelete, addProductDelete, isSearching,
	addProductCount, subProductCount
}: ProductListItemProps) {

	const [isClicked, setIsClicked] = useState<boolean>(false);
	const [isProductClicked, setIsProductClicked] = useState<boolean>(false);
	const [showOrder, setShowOrder] = useState<boolean>(false);
	const mediaMatches = useMediaPredicate('(min-width: 881px)');

	const onMouseEnter = () => {	
		setShowOrder(true);					
	};

	const onClickProductOrder = () => {	
		setIsClicked(!isClicked);
	};

	const onMouseLeave = () => {		
		setShowOrder(false);
	};

	const onClickProduct = () => {
		if (isProductClicked) {
			subProductCount && subProductCount();
			removeProductDelete && removeProductDelete(product.product_id);
		} else {
			addProductCount && addProductCount();
			addProductDelete && addProductDelete(product.product_id);
		}
		setIsProductClicked(!isProductClicked);
	};

	const productContent = () => (
		<>
			<ProductImage path={axios.defaults.baseURL+product.image} name={product.name} promo={product.new_price}
				className={cn({
					[styles['image-selected']]: isProductClicked && isSearching
				})}/>	
			<ProductItemPrice price={product.price } newPrice={product.new_price}/>			
			<ProductItemTitle title={product.name}/>
		</>
	);

	useEffect(() => {
		!isSearching && isProductClicked && setIsProductClicked(false);
	}, [isSearching, isProductClicked]);


	return (
		<div className={cn(styles['product-card'], {
			[styles['product-card-selected']]: showOrder || isClicked || !mediaMatches,
			[styles['searched-product']]: isProductClicked && isSearching
		}, className)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
		onClick={onClickProduct}>

			{ isSearching? 
				<div>
					{productContent()}
				</div>
				:
				<NavItem to={isAdmin? adminRoute+adminHomeRoute+adminEditCatalog+adminEditProductCard+product.slug: products+product.slug}>
					{productContent()}
				</NavItem>
			}

			{
				isProductClicked && isSearching &&

				<div className={cn(styles['select-flag'])}>
					{selectedProductFlag()}
				</div>
			}

			{ !isAdmin &&
				<div className={cn(styles['product-btn'])} onClick={onMouseLeave}>
					{
						(showOrder || isClicked || !mediaMatches) && 
					<ProductOrder onClickProductOrder={onClickProductOrder}
						commentPlaceholder={`${commentPlaceholderOrderCall} ${product.name} (${product.code})`}>
						Заказать
					</ProductOrder>
					}
				</div>
			}
			
		</div>
	);
}

export default ProductListItem;