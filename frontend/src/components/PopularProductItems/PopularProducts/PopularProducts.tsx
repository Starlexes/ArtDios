import axios from 'axios';
import LendingHeadTitle from '../../LendingItems/LendingHeadTitle/LendingHeadTitle';
import PopularProductContent from '../PopularProductContent/PopularProductContent';
import PopularProductItem from '../PopularProductItem/PopularProductItem';
import PopularProductItems from '../PopularProductItems/PopularProductItems';
import styles from './PopularProducts.module.css';
import { PopularProductsProps } from './PopularProducts.props';
import cn from 'classnames';
import NavItem from '../../Header/NavItem/NavItem';
import { catalog } from '../../../utils/constants';


function PopularProducts({popProducts, category, className}: PopularProductsProps) {
	
	return (
	
		<div className={cn(styles['popular-products'], className)}>
			<LendingHeadTitle>Популярные товары</LendingHeadTitle>
			<PopularProductItems>
				{popProducts.length > 0 && category && popProducts.map( (product, index) => (
					<NavItem to={catalog+category[index]?.slug} key={product.id}>
						<PopularProductItem>
							<PopularProductContent isPromo={false}>

								<span>{category[index]?.name}</span>
							</PopularProductContent>
							<img src={axios.defaults.baseURL+product.image} alt={category[index]?.name} />
						</PopularProductItem>
					</NavItem>
				))}
				
				
			</PopularProductItems>
		</div>	

	);

}

export default PopularProducts;