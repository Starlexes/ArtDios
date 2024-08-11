
import axios from 'axios';
import ProductImage from '../ProductImage/ProductImage';
import styles from './ProductListItem.module.css';
import { ProductListItemProps } from './ProductListItem.props';
import cn from 'classnames';
import ProductItemPrice from '../ProductItemPrice/ProductItemPrice';
import ProductItemTitle from '../ProductItemTitle/ProductItemTitle';
import ProductOrder from '../ProductOrder/ProductOrder';
import { useState } from 'react';
import NavItem from '../../Header/NavItem/NavItem';
import { products } from '../../../utils/constants';

function ProductListItem({product, className }: ProductListItemProps) {

	const [isClicked, setIsClicked] = useState<boolean>(false);

	const [showOrder, setShowOrder] = useState<boolean>(false);


	const onMouseEnter = () => {	
		setShowOrder(true);
					
	};

	const onClickProductOrder = () => {	
		setIsClicked(!isClicked);
	};

	const onMouseLeave = () => {	
		
		setShowOrder(false);
		
	};


	return (
		<div className={cn(styles['product-card'], {
			[styles['product-card-selected']]: showOrder || isClicked
		}, className)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<NavItem to={products+product.slug}>
				<ProductImage path={axios.defaults.baseURL+product.image} name={product.name} promo={product.new_price} />
	
				<ProductItemPrice price={product.price } newPrice={product.new_price}/>
			
				<ProductItemTitle title={product.name}/>

			</NavItem>
			<div className={cn(styles['product-btn'])} onClick={onMouseLeave}>
				{
					(showOrder || isClicked) && 
				<ProductOrder onClickProductOrder={onClickProductOrder}>
					Заказать
				</ProductOrder>
				}
			</div>
			
		</div>
	);
}

export default ProductListItem;