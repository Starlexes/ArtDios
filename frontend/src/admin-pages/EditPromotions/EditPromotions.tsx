
import { useEffect, useState } from 'react';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import styles from './EditPromotions.module.css';
import { EditPromotionsProps } from './EditPromotions.props';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PopularProductItems from '../../components/PopularProductItems/PopularProductItems/PopularProductItems';
import AdminPopularProductItem from '../../admin-components/AdminPopularProductItem/AdminPopularProductItem';
import axios from 'axios';
import PopularProductContent from '../../components/PopularProductItems/PopularProductContent/PopularProductContent';
import { useNavigate } from 'react-router-dom';
import ItemActions from '../../admin-components/ItemActions/ItemActions';
import ItemActionButton from '../../admin-components/ItemActionButton/ItemActionButton';
import AddItemButton from '../../admin-components/AddItemButton/AddItemButton';
import { addItemPlus, adminCreateNewCard, adminEditPromotionCard, adminEditPromotions, adminHomeRoute, adminRoute } from '../../utils/constants';
import { fetchPromotion, updatePromotion } from '../../slices/promotionSlice';


function EditPromotions({className }: EditPromotionsProps) {

	const {isLoading, promo} = useAppSelector((state: RootState) => state.promotions );
	
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [activeItems, setActiveItems] = useState<number[]>([]);


	useEffect(() => {
		if (promo.length === 0) {
			dispatch(fetchPromotion());
		}
		
		if (promo.length > 0) {
			const initiallyActive = promo
				.filter(item => item.is_show)
				.map(item => item.id);
			setActiveItems(initiallyActive);
		}
	}, [promo, dispatch]);

	const onClickSearch = () => {
		setIsSearching(!isSearching);
	};

	const onClickNewItem = () => {
		navigate(adminRoute+adminHomeRoute+adminEditPromotions+adminCreateNewCard);
	};

	const onClickItem = (id: number, isShow: boolean, slug: string) => {

		if (isSearching ) {

			const isCurrentlyActive = activeItems.includes(id);


			if (activeItems.length < 3) {
				dispatch(updatePromotion({
					id: id,
					data: {
						is_show: !isShow
					}}));
				if (!isCurrentlyActive) {
					setActiveItems([...activeItems, id]);
				}

			} else {
				dispatch(updatePromotion({
					id: id,
					data: {
						id: id,
						is_show: false
					}}));
			}
			if (isCurrentlyActive) {				
				setActiveItems(activeItems.filter((itemId) => itemId !== id));				
			}

		} else {			
			navigate(adminRoute+adminHomeRoute+adminEditPromotions+adminEditPromotionCard+slug);
		}

	};

		
	return (
		
		<section>
			<div className={cn(styles['promotions'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Акции</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Акции
				</AdminPageHead>

				{isLoading? <Spinner/> :

					<>
						<ItemActions>
							
							<ItemActionButton onClick={onClickSearch}>
								{!isSearching? 
									'Выбрать акцию'
									: 'Выйти из режима выбора'
								}
							</ItemActionButton>
														
						</ItemActions>
					
						<PopularProductItems className={cn(styles['promo-items'], className)}>
							<AddItemButton shape='circle' className={cn(styles['add-item'])} onClick={onClickNewItem}>
								{addItemPlus()}
							</AddItemButton>

							{promo.map( pop => (
							
								<AdminPopularProductItem key={pop.id} active={pop.is_show}
									onClick={() => onClickItem(pop.id, pop.is_show, pop.slug)}>
									<PopularProductContent isPromo={true}>
										<span>{pop.name}</span>
									</PopularProductContent>
                                
									<img src={axios.defaults.baseURL+pop.second_image} alt={pop.name} />
								</AdminPopularProductItem>
							
							))}
                    
                    
						</PopularProductItems>
					</>
				}
				
			</div>
		</section>
	
	);

}

export default EditPromotions;

