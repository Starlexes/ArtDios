
import { useEffect, useState } from 'react';
import AddItemButton from '../../admin-components/AddItemButton/AddItemButton';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import ModelEditItem from '../../admin-components/ModelEditItem/ModelEditItem';
import ModelEditItems from '../../admin-components/ModelEditItems/ModelEditItems';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { addPlus } from '../../utils/constants';
import styles from './EditProductTypes.module.css';
import { EditProductTypesProps } from './EditProductTypes.props';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { addProductType, deleteProductType, fetchProductType, updateProductType } from '../../slices/productTypeSlice';
import ModelAddField from '../../admin-components/ModelAddField/ModelAddField';



function EditProductTypes({className }: EditProductTypesProps) {

	const {isLoading, error, productTypes} = useAppSelector((state: RootState) => state.productTypes );
	const [addClicked, setAddClicked] = useState<boolean>(false);

	const sortedProductTypes = [...productTypes].sort((a, b) => 
		String(a.name).localeCompare(String(b.name))
	);

	const dispatch = useAppDispatch();
	useEffect(() => {
		if (productTypes.length === 0) {
			dispatch(fetchProductType());
		}
	}, [productTypes.length, dispatch]);

	const onClickDelete = (id: number) => {
		dispatch(deleteProductType(id));
	};

	const onClickAccept = (id: number | undefined, name: string) => {
	
		if (id && name) {
			dispatch(updateProductType({id: id, data: {name: name}}));
		}
	};
	
	const showToggleItem = (id: number | undefined, isShow: boolean) => {
		if (id) {
			dispatch(updateProductType({id: id, data: {is_show: isShow}}));
		}
	};

	const onClick = () => {
		setAddClicked(!addClicked);
	};

	const onClickSubmit = (name: string) => {
		dispatch(addProductType({
			name: name,
			is_show: true
		}));
		setAddClicked(false);
	};

	
	
	return (
		
		<section>
			<div className={cn(styles['product-types'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Виды товаров</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Виды товаров
				</AdminPageHead>
                
				<ModelEditItems>
					{addClicked? 
						<ModelAddField onClickAdd={onClick} onClickSubmit={onClickSubmit}/>
						:
						<AddItemButton shape='rect' onClick={onClick}>
                    Добавить
							{addPlus()}
						</AddItemButton>
					}

					{
						isLoading? <Spinner/>:
							productTypes.length > 0 && !error? 
								sortedProductTypes.map(product=> (
									<ModelEditItem key={product.id} modelItem={product}
										onClickAccept={onClickAccept} onClickDelete={onClickDelete}
										showToggleItem={showToggleItem}/>
                                
									
								)):
								<span>Видов товаров не найдено, создайте первый</span>
					}
					
				</ModelEditItems>
				
				
			</div>
		</section>
	
	);

}

export default EditProductTypes;

