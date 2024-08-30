
import { ChangeEvent, useEffect, useState} from 'react';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import styles from './PopularProductCard.module.css';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCategory } from '../../slices/categorySlice';
import NewItemLayout from '../../admin-components/NewItemLayout/NewItemLayout';
import ItemsSelector from '../../admin-components/ItemsSelector/ItemsSelector';
import { PopularProductCardProps } from './PopularProductCard.props';
import { SingleValue } from 'react-select';
import { OptionType } from '../../components/Filters/Media/SortingOrderMedia/SortingOrderMedia';
import ItemImagePreview from '../../admin-components/ItemImagePreview/ItemImagePreview';
import SaveDeleteButton from '../../admin-components/SaveDeleteButton/SaveDeleteButton';
import { deletePopularProduct, fetchPopProduct, updatePopularProduct } from '../../slices/popularProductSlice';
import { adminEditCategoryMenuRoute, adminEditPopularProducts, adminHomeRoute, adminRoute } from '../../utils/constants';
import ModalAskDelete from '../../admin-components/ModalAskDelete/ModalAskDelete';
import ItemCardTitle from '../../admin-components/ItemCardTitle/ItemCardTitle';


function PopularProductCard({className }: PopularProductCardProps) {

	const {isLoading: isLoadingCategory, categories} = useAppSelector((state: RootState) => state.categories );
	const {isLoading, popProducts} = useAppSelector((state: RootState) => state.popProducts );
	
	const [image, setImage] = useState<File | null>(null);
	const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType | null>>(null);
	const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
	
	const { popItem: categorySlugItem} = useParams<{ popItem: string }>();

	const popItem = popProducts.find(product => product.category === 
		(categories.find(c => c.slug === categorySlugItem)?.id));


	const validatedCategories = categories.filter(category => 
		!popProducts.some(item => item.category === category.id) || (category.id === popItem?.category)
	);

	const popCategory = validatedCategories.find(item => item.id === popItem?.category);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (categories.length === 0) {
			dispatch(fetchCategory());
		}
		if (popProducts.length === 0) {
			dispatch(fetchPopProduct());
		}
	}, [dispatch, categories.length, popProducts.length]);

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
		if (selectedOption || image) {
			const formData = new FormData();
			image && formData.append('image', image);
			selectedOption && formData.append('category', selectedOption.value);
			dispatch(updatePopularProduct({id: Number(popItem?.id), data: formData}));
		}

		navigate(adminRoute+adminHomeRoute+adminEditPopularProducts+adminEditCategoryMenuRoute);
	};

	const onClickDelete = () => {
		setDeleteClicked(!deleteClicked);
		
	};

	const onDelete = (id?: number) => {
		if (id) {
			dispatch(deletePopularProduct(id));
			navigate(adminRoute+adminHomeRoute+adminEditPopularProducts+adminEditCategoryMenuRoute);
		}
	};
			
	return (
		
		<section>
			<div className={cn(styles['pop-card'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Популярный товар</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
					Популярный товар
				</AdminPageHead>

				<NewItemLayout>
					<ItemCardTitle>
						Превью
					</ItemCardTitle>
				
					{isLoadingCategory || isLoading? <Spinner/> :
						<>
							<div className={cn(styles['product-items'])}>
								<div className={cn(styles['item-selector'])}>
									<ItemsSelector defaultOption={String(popCategory?.name)}
										optionLabels={validatedCategories.map(item => {
											return {id: item.id, name: item.name};
										})} onChangeOption={onChangeOption}>

									</ItemsSelector>
								</div>
								<ItemImagePreview image={image? image: popItem? popItem.image: null} onChange={onChangeImage}/>
							</div>
							<div className={cn(styles['action-btns'])}>
								<SaveDeleteButton typeAction='accept' onClick={onClickSubmit}/>
								<SaveDeleteButton typeAction='delete' onClick={onClickDelete}/>
							</div>
							
						</>
					}
				</NewItemLayout>
				
				<ModalAskDelete isOpen={deleteClicked} closeModal={onClickDelete}
					message='этот популярный товар' idItem={popItem?.id}
					onDelete={onDelete}/>
			</div>
		</section>
	
	);

}

export default PopularProductCard;

