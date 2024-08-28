
import { useEffect, useState } from 'react';
import AddItemButton from '../../admin-components/AddItemButton/AddItemButton';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import ModelEditItem from '../../admin-components/ModelEditItem/ModelEditItem';
import ModelEditItems from '../../admin-components/ModelEditItems/ModelEditItems';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { addPlus } from '../../utils/constants';
import styles from './EditSubCategory.module.css';
import { EditSubCategoryProps } from './EditSubCategory.props';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ModelAddField from '../../admin-components/ModelAddField/ModelAddField';
import { addSubCategory, deleteSubCategory, fetchCategory, updateSubCategory } from '../../slices/categorySlice';
import { fetchProductType } from '../../slices/productTypeSlice';


function EditSubCategory({className }: EditSubCategoryProps) {

	const {isLoading, error, subcategories, categories} = useAppSelector((state: RootState) => state.categories );
	const {productTypes, isLoading: isLoadingProductTypes} = useAppSelector((state: RootState) => state.productTypes );
	const [addClicked, setAddClicked] = useState<boolean>(false);

	const sortedSubCategory = [...subcategories].sort((a, b) => 
		a.name.localeCompare(b.name)
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (categories.length === 0) {
			dispatch(fetchCategory());
		}
		if (productTypes.length === 0 ) {
			dispatch(fetchProductType());
		}
	}, [categories.length, productTypes.length, dispatch]);

	const onClickDelete = (id: number) => {
		
		dispatch(deleteSubCategory(id));
	};

	const onClickAccept = (id: number | undefined, name: string) => {
		
		if (id && name) {
			dispatch(updateSubCategory({id: id, data: {name: name}}));
		}
	};
	
	const showToggleItem = (id: number | undefined, isShow: boolean) => {
		if (id) {
			dispatch(updateSubCategory({id: id, data: {is_show: isShow}}));
		}
	};

	const onClick = () => {
		setAddClicked(!addClicked);
	};

	const onClickSubmit = (name: string, parent: number | null = null) => {
		if (name && parent) {
			dispatch(addSubCategory({
				name: name,
				is_show: true,
				parent: parent
			}));
		}
		setAddClicked(false);
	};

	const onClickPromo =(id: number | undefined, discount: number | null) => {
		if (id) {
			dispatch(updateSubCategory({id: id, data: {discount: discount}}));
		}
	};
	
	return (
		
		<section>
			<div className={cn(styles['categories'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Подкатегории</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Подкатегории
				</AdminPageHead>
                
				<ModelEditItems>
					{addClicked? 
						<ModelAddField onClickAdd={onClick} onClickSubmit={onClickSubmit}
							productTypes={productTypes} categories={categories}/>
						:
						<AddItemButton shape='rect' onClick={onClick}>
                    Добавить
							{addPlus()}
						</AddItemButton>
					}

					{
						isLoading || isLoadingProductTypes? <Spinner/>:
							categories.length > 0 && !error? 
								sortedSubCategory.map(product => (
									
									<ModelEditItem key={product.id} modelItem={product}
										onClickAccept={onClickAccept} onClickDelete={onClickDelete}
										showToggleItem={showToggleItem} onClickDiscount={onClickPromo}/>
								)                       
									
								):
								<span>Подкатегорий не найдено, создайте первую</span>
					}
					
				</ModelEditItems>								
			</div>
		</section>
	
	);

}

export default EditSubCategory;

