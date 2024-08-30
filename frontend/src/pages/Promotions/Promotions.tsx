import styles from './Promotions.module.css';
import { PromotionsProps } from './Promotions.props';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { AppDispatch, RootState} from '../../store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPromotion } from '../../slices/promotionSlice';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../Error/Error';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PopularProductItems from '../../components/PopularProductItems/PopularProductItems/PopularProductItems';
import NavItem from '../../components/Header/NavItem/NavItem';
import PopularProductItem from '../../components/PopularProductItems/PopularProductItem/PopularProductItem';
import PopularProductContent from '../../components/PopularProductItems/PopularProductContent/PopularProductContent';
import axios from 'axios';
import { promotionRoute } from '../../utils/constants';
import PageHead from '../../components/PageHead/PageHead';



function Promotions({className }: PromotionsProps) {
	const dispatch = useDispatch<AppDispatch>();
	
	const {promo, error: promoError, isLoading } = useAppSelector((state: RootState) => state.promotions);
	

	useEffect(() => {
		if (!promo.length) {
			dispatch(fetchPromotion());
		}
	}, [dispatch, promo.length]);

	
	return (
		!promoError?
			isLoading? <Spinner/>: 
				<section>
					<div className={cn(styles['promotions'], className)}>
						<HelmetProvider>
							<Helmet>
								<title>Акции</title>
							</Helmet>
						</HelmetProvider>
						<PageHead>Акции</PageHead>
                    
						<PopularProductItems className={cn(styles['promo-items'], className)}>
							{promo.map( promo => (
								<NavItem to={promotionRoute+promo.slug} key={promo.id} className={cn(styles['promo-item'])}>
									<PopularProductItem>
										<PopularProductContent isPromo={true}>
											<span>{promo.name}</span>
										</PopularProductContent>
							
										<img src={axios.defaults.baseURL+promo.second_image} alt={promo.name} />
									</PopularProductItem>
								</NavItem>
							))}
				
				
						</PopularProductItems>
					</div>
				</section>
			: <Error/>
	);

}

export default Promotions;