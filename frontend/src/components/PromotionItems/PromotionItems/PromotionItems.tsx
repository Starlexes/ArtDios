import axios from 'axios';
import LendingHeadTitle from '../../LendingItems/LendingHeadTitle/LendingHeadTitle';
import styles from './PromotionItems.module.css';
import { PromotionItemsProps } from './PromotionItems.props';
import cn from 'classnames';
import NavItem from '../../Header/NavItem/NavItem';
import PopularProductItems from '../../PopularProductItems/PopularProductItems/PopularProductItems';
import PopularProductItem from '../../PopularProductItems/PopularProductItem/PopularProductItem';
import PopularProductContent from '../../PopularProductItems/PopularProductContent/PopularProductContent';
import { promotionRoute } from '../../../utils/constants';



function PromotionItems({promotions, className}: PromotionItemsProps) {
	
	return (
	
		<div className={cn(styles['promo-items'], className)}>
			<LendingHeadTitle>Акции</LendingHeadTitle>
			<PopularProductItems>
				{promotions.map( promo => (
					<NavItem to={promotionRoute+promo.slug} key={promo.id}>
						<PopularProductItem>
							<PopularProductContent className={cn(styles['promo-content'], className)} isPromo={true}>
								<span>{promo.name}</span>
							</PopularProductContent>
							
							<img src={axios.defaults.baseURL+promo.second_image} alt={promo.name} />
						</PopularProductItem>
					</NavItem>
				))}
				
				
			</PopularProductItems>
		</div>	

	);

}

export default PromotionItems;