import styles from './Lending.module.css';
import { LendingProps } from './Lending.props';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { AppDispatch, RootState, selectFilteredCategory } from '../../store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategory } from '../../slices/categorySlice';
import LendingBanner from '../../components/LendingItems/LendingBanner/LendingBanner';
import PopularProducts from '../../components/PopularProductItems/PopularProducts/PopularProducts';
import { fetchPopProduct } from '../../slices/popularProductSlice';
import PromotionItems from '../../components/PromotionItems/PromotionItems/PromotionItems';
import { fetchPromotion } from '../../slices/promotionSlice';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet';


function Lending({className }: LendingProps) {
	const dispatch = useDispatch<AppDispatch>();
	
	const categories = useAppSelector((state: RootState) => selectFilteredCategory(state));
	const {popProducts, error: popularError } = useAppSelector((state: RootState) => state.popProducts);
	const {promo, error: promoError} = useAppSelector((state: RootState) => state.promotions);
	const namesCategories = popProducts.map(product => {
		const category = categories.find(item => item.id === product.category);
		return category? category: null;
	});
	
	const showPopProducts = popProducts.filter(product => product.is_show).slice(0, 3);
	const showPromo = promo.filter(item => item.is_show).slice(0, 3);

	useEffect(() => {
		if (!categories.length) {
			dispatch(fetchCategory());
		}
		if (!popProducts.length) {
			dispatch(fetchPopProduct());
		}
		if (!promo.length) {
			dispatch(fetchPromotion());
		}
	}, [dispatch, categories.length, popProducts.length, promo.length]);

	
	return (
		<div className={cn(styles['lending'], className)}>
			<HelmetProvider>
				<Helmet>
					<title>АРТДИОС</title>
				</Helmet>
			</HelmetProvider>
			<LendingBanner/>
			<div className={cn(styles['lending-items'])}>
				<section>
					<div className={cn(styles['lending-head'])}> 
						{showPopProducts.length && !popularError &&
							<PopularProducts category={namesCategories} popProducts={showPopProducts}/>
						}

						{
							showPromo.length && !promoError && 
							<PromotionItems promotions={showPromo}/>							
						}
					</div>
				</section>
			</div>
		</div>
	
	);

}

export default Lending;