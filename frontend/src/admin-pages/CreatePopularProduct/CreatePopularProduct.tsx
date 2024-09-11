
import { ChangeEvent, useEffect, useState} from 'react';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import styles from './CreatePopularProduct.module.css';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { fetchCategory } from '../../slices/categorySlice';
import NewItemLayout from '../../admin-components/NewItemLayout/NewItemLayout';
import ItemsSelector from '../../admin-components/ItemsSelector/ItemsSelector';
import { CreatePopularProductProps } from './CreatePopularProduct.props';
import { SingleValue } from 'react-select';
import { OptionType } from '../../components/Filters/Media/SortingOrderMedia/SortingOrderMedia';
import ItemImagePreview from '../../admin-components/ItemImagePreview/ItemImagePreview';
import SaveDeleteButton from '../../admin-components/SaveDeleteButton/SaveDeleteButton';
import { addPopularProduct, fetchPopProduct } from '../../slices/popularProductSlice';
import { adminEditCategoryMenuRoute, adminEditPopularProducts, adminHomeRoute, adminRoute } from '../../utils/constants';
import ItemCardTitle from '../../admin-components/ItemCardTitle/ItemCardTitle';


function CreatePopularProduct({className }: CreatePopularProductProps) {

	const {isLoading: isLoadingCategory, categories} = useAppSelector((state: RootState) => state.categories );
	const {isLoading, popProducts} = useAppSelector((state: RootState) => state.popProducts );
	const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType> | null>(null);
	const [image, setImage] = useState<File | null>(null);
	const [acceptClicked, setAcceptClicked] = useState<boolean>(false);
	const [isFetched, setIsFetched] = useState<boolean>(false);
	const validatedCategories = categories.length > 0? categories.filter(category => 
		!popProducts.some(item => item.category === category.id)
	): [];

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isFetched) {
			setIsFetched(true);
			if (categories.length === 0 && !isLoadingCategory) {
				dispatch(fetchCategory());
			}
			if (popProducts.length === 0 && !isLoading) {
				dispatch(fetchPopProduct());
			}
		}
	}, [dispatch, categories.length, popProducts.length,
		isFetched, isLoading, isLoadingCategory]);

	const onChangeOption = (option: SingleValue<OptionType>) => {
		setSelectedOption(option);
		
	};

	const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
		}
	
	};

	const onClickSubmit = () => {
		setAcceptClicked(true);
		if (selectedOption && image) {
			const formData = new FormData();
			const catId = selectedOption.value;
			formData.append('image', image);
			formData.append('is_show', 'false');
			formData.append('category', catId);
			dispatch(addPopularProduct(formData));
			navigate(adminRoute+adminHomeRoute+adminEditPopularProducts+adminEditCategoryMenuRoute);
		}

	};
			
	return (
		
		<section>
			<div className={cn(styles['pop-products'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Новый популярный товар</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Новый популярный товар
				</AdminPageHead>

				<NewItemLayout>
					<ItemCardTitle>
						Превью
					</ItemCardTitle>
					{isLoadingCategory || isLoading? <Spinner/> :
						<>
							<div className={cn(styles['product-items'])}>
								<div className={cn(styles['item-selector'])}>
									{ validatedCategories.length > 0 &&
										<ItemsSelector defaultOption='Выбрать категорию'
											optionLabels={validatedCategories.map(item => {
												return {id: item.id, name: item.name};
											})} onChangeOption={onChangeOption} selectErrors={acceptClicked && !selectedOption}>

										</ItemsSelector>
									}
								</div>
								<ItemImagePreview errors={acceptClicked && !image} image={image} onChange={onChangeImage}/>
							</div>
							<div className={cn(styles['action-btns'])}>
								<SaveDeleteButton typeAction='accept' onClick={onClickSubmit}/>
								
							</div>
							
						</>
					}
				</NewItemLayout>
				
			</div>
		</section>
	
	);

}

export default CreatePopularProduct;

