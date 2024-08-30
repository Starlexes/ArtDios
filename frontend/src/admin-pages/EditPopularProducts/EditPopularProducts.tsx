
import { useEffect, useState } from 'react';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import styles from './EditPopularProducts.module.css';
import { EditPopularProductsProps } from './EditPopularProducts.props';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { fetchPopProduct, updatePopularProduct } from '../../slices/popularProductSlice';
import PopularProductItems from '../../components/PopularProductItems/PopularProductItems/PopularProductItems';
import AdminPopularProductItem from '../../admin-components/AdminPopularProductItem/AdminPopularProductItem';
import axios from 'axios';
import PopularProductContent from '../../components/PopularProductItems/PopularProductContent/PopularProductContent';
import { useNavigate } from 'react-router-dom';
import ItemActions from '../../admin-components/ItemActions/ItemActions';
import ItemActionButton from '../../admin-components/ItemActionButton/ItemActionButton';
import AddItemButton from '../../admin-components/AddItemButton/AddItemButton';
import { addItemPlus, adminCreateNewCard, adminEditPopularProductCard, adminEditPopularProducts, adminHomeRoute, adminRoute } from '../../utils/constants';
import { fetchCategory } from '../../slices/categorySlice';


function EditPopularProducts({className }: EditPopularProductsProps) {

	const {isLoading, popProducts} = useAppSelector((state: RootState) => state.popProducts );
	const {isLoading: isLoadingCategory, categories} = useAppSelector((state: RootState) => state.categories );

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [activeItems, setActiveItems] = useState<number[]>([]);

	const namesCategories = popProducts.map(product => {
		const category = categories.find(item => item.id === product.category);
		return category? category: null;
	});


	useEffect(() => {
		if (popProducts.length === 0) {
			dispatch(fetchPopProduct());
		}
		if (categories.length === 0) {
			dispatch(fetchCategory());
		}
		if (popProducts.length > 0) {
			const initiallyActive = popProducts
				.filter(item => item.is_show)
				.map(item => item.id);
			setActiveItems(initiallyActive);
		}
	}, [popProducts, categories.length, dispatch]);

	const onClickSearch = () => {
		setIsSearching(!isSearching);
	};

	const onClickNewItem = () => {
		navigate(adminRoute+adminHomeRoute+adminEditPopularProducts+adminCreateNewCard);
	};

	const onClickItem = (id: number, isShow: boolean, category: number) => {

		if (isSearching ) {

			const isCurrentlyActive = activeItems.includes(id);


			if (activeItems.length < 3) {
				dispatch(updatePopularProduct({
					id: id,
					data: {
						is_show: !isShow
					}}));
				if (!isCurrentlyActive) {
					setActiveItems([...activeItems, id]);
				}

			} else {
				dispatch(updatePopularProduct({
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
			const categorySlug = categories.find(item => item.id === category)?.slug;
			navigate(adminRoute+adminHomeRoute+adminEditPopularProducts+adminEditPopularProductCard+categorySlug+'/');
		}

	};

		
	return (
		
		<section>
			<div className={cn(styles['pop-products'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Популярные товары </title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Популярные товары 
				</AdminPageHead>

				{isLoading || isLoadingCategory? <Spinner/> :

					<>
						<ItemActions>

							
							<ItemActionButton onClick={onClickSearch}>
								{!isSearching? 
									'Выбрать товар'
									: 'Выйти из режима выбора'
								}
							</ItemActionButton>
							

							
						</ItemActions>
					
						<PopularProductItems className={cn(styles['pop-items'], className)}>
							<AddItemButton shape='circle' className={cn(styles['add-item'])} onClick={onClickNewItem}>
								{addItemPlus()}
							</AddItemButton>
							{popProducts.map( (pop, index) => (
							
								<AdminPopularProductItem key={pop.id} active={pop.is_show}
									onClick={() => onClickItem(pop.id, pop.is_show, pop.category)}>
									<PopularProductContent isPromo={false}>
										<span>{namesCategories[index]?.name}</span>
									</PopularProductContent>
                                
									<img src={axios.defaults.baseURL+pop.image} alt={namesCategories[index]?.name} />
								</AdminPopularProductItem>
							
							))}
                    
                    
						</PopularProductItems>
					</>
				}
				
			</div>
		</section>
	
	);

}

export default EditPopularProducts;

