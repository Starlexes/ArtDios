
import { ChangeEvent, useCallback, useEffect, useState} from 'react';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './CreateProduct.module.css';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import NewItemLayout from '../../admin-components/NewItemLayout/NewItemLayout';
import { CreateProductProps } from './CreateProduct.props';
import ItemImagePreview from '../../admin-components/ItemImagePreview/ItemImagePreview';
import SaveDeleteButton from '../../admin-components/SaveDeleteButton/SaveDeleteButton';
import { addItemPlus, adminEditCatalog, adminEditCategoryMenuRoute, adminHomeRoute, adminRoute } from '../../utils/constants';
import ItemCardTitle from '../../admin-components/ItemCardTitle/ItemCardTitle';
import ItemCardInputArea from '../../admin-components/ItemCardInputArea/ItemCardInputArea';
import ItemCardInputLabel from '../../admin-components/ItemCardInputLabel/ItemCardInputLabel';
import ItemCardInput from '../../admin-components/ItemCardInput/ItemCardInput';
import { addProductCard, clearId, deleteProductCard, updateProductCard } from '../../slices/productSlice';
import ItemCardAreaInput from '../../admin-components/ItemCardAreaInput/ItemCardAreaInput';
import ItemsSelector from '../../admin-components/ItemsSelector/ItemsSelector';
import { SingleValue } from 'react-select';
import { OptionType } from '../../components/Filters/Media/SortingOrderMedia/SortingOrderMedia';
import { RootState } from '../../store';
import { fetchCategory } from '../../slices/categorySlice';
import { fetchProductType } from '../../slices/productTypeSlice';
import ItemCardCharacteristic from '../../admin-components/ItemCardCharacteristic/ItemCardCharacteristic';
import AddItemButton from '../../admin-components/AddItemButton/AddItemButton';
import { addCharacteristic, deleteCharacteristic, updateCharacteristic } from '../../slices/characteristicSlice';
import { fetchProductCard } from '../../slices/productCardSlice';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../../pages/Error/Error';
import ModalAskDelete from '../../admin-components/ModalAskDelete/ModalAskDelete';



function CreateProduct({className, newItem=false }: CreateProductProps) {

	const {createdId} = useAppSelector((state: RootState) => state.products);
	const {productTypes, isLoading: isLoadingProductType} = useAppSelector((state: RootState) => state.productTypes );
	const {categories, subcategories, isLoading: isLoadingCategory} = useAppSelector((state: RootState) => state.categories );
	const { product: productCard, isLoading: isLoadingProductCard } = useAppSelector((state: RootState) => state.productCard);
	const { product: productParam} = useParams<{ product: string }>();

	
	const [name, setName] = useState<string>('');
	const [image, setImage] = useState<File | null>(null);
	const [secondImage, setSecondImage] = useState<File | null>(null);
	const [thirdImage, setThirdImage] = useState<File | null>(null);
	const [description, setDescription] = useState<string>('');
	const [code, setCode] = useState<string>('');
	const [price, setPrice] = useState<string>('');
	const [chars, setChars] = useState<{property: string, value: string, id: number, new?: boolean, update?: boolean}[]>([]);

	const [productType, setProductType] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [subcategory, setSubCategory] = useState<string>('');

	const [acceptClicked, setAcceptClicked] = useState<boolean>(false);
	const [newItemClicked, setNewItemClicked] = useState<boolean>(false);
	const [isFetched, setIsFetched] = useState<boolean>(false);
	const [isDeleteClicked, setIsDeleteClicked] = useState<boolean>(false);
	

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
		}
	};

	const navigateMenu = useCallback(() => {
		navigate(adminRoute + adminHomeRoute + adminEditCatalog + adminEditCategoryMenuRoute);
	}, [navigate]);

	const onChangeSecondImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSecondImage(file);
		}
	};

	const onChangeThirdImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setThirdImage(file);
		}
	};

	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(e.target.value);
	};

	const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value);
	};

	const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
		setPrice(e.target.value);
	};

	const onChangeProductType = (option: SingleValue<OptionType>) => {
		setProductType(option?.value as string);
	};

	const onChangeCategory = (option: SingleValue<OptionType>) => {
		setCategory(option?.value as string);
	};

	const onChangeSubCategory = (option: SingleValue<OptionType>) => {
		setSubCategory(option?.value as string);
	};

	const onChangeChars = (index: number, field: 'property' | 'value', value: string) => {
		const newFeatures = [...chars];
		newFeatures[index][field] = value;
		setChars(newFeatures);
	};

	const onChangeUpdatedChars = (index: number, field: 'property' | 'value', value: string) => {
		const newFeatures = [...chars];
		newFeatures[index][field] = value;
		if (!newFeatures[index].update) {
			newFeatures[index].update = true;
		}
		setChars(newFeatures);
	};

	const onClickAdd = () => {
		setNewItemClicked(!newItemClicked);
		const uniqueId = Date.now();
		setChars(chars => [...chars, {property: '', value: '', id: uniqueId, new: true}]);
	};

	const onClickSubmit = () => {
		setAcceptClicked(true);

		if (productParam && chars.every(item => item.property && item.value)) {
			const formData = new FormData();
			const updatedChars = chars.filter(item => item.update);
			const newItems = chars.filter(item => item.new);
			image && formData.append('image', image);
			secondImage && formData.append('second_image', secondImage);
			thirdImage && formData.append('third_image', thirdImage);
			name && formData.append('name', name);
			description && formData.append('description', description);
			price && formData.append('price', String(price));
			code && formData.append('code', code);
			subcategory && formData.append('category', String(subcategory));
			dispatch(updateProductCard({id: Number(productCard?.product_id), data: formData}));
			updatedChars.length > 0 && dispatch(updateCharacteristic(updatedChars.map(item => {
				return {char_id: item.id, name: item.property, description: item.value};
			})));
			newItems.length > 0 && dispatch(addCharacteristic(newItems.map(item => {
				return {name: item.property, description: item.value, product: productCard?.product_id};
			})));
			navigateMenu();
		}
		else {
			
			if (
				[name, image, description, code, price,
					subcategory]
					.every(item => item)
				
			) {
				const formData = new FormData();
				formData.append('image', image as File);
				secondImage && formData.append('second_image', secondImage);
				thirdImage && formData.append('third_image', thirdImage);
				formData.append('name', name);
				formData.append('description', description);
				formData.append('price', String(price));
				formData.append('code', code);
				formData.append('category', String(subcategory));
				dispatch(addProductCard(formData));
				chars.length === 0 && navigateMenu();
			}
		
		}
	};

	const onClickDeleteProduct = () => {
		setIsDeleteClicked(!isDeleteClicked);
	};

	const onClickDelete = (idItem: number) => {
		setChars(chars => chars.filter(item => item.id !== idItem));
	};

	const onDeleteProduct = (id: number) => {
		dispatch(deleteProductCard(id));
		navigateMenu();
	};

	const onDeleteCharacteristic = (id: number) => {
		dispatch(deleteCharacteristic(id));
		onClickDelete(id);
	};

	useEffect(() => {
		if (!isFetched) {
			
			setIsFetched(true);
			if (!isLoadingProductCard && productParam) {				
				dispatch(fetchProductCard(productParam));										
			}
			if (!isLoadingCategory && categories.length === 0) {
				dispatch(fetchCategory());
			}
			if (!isLoadingProductType && productTypes.length === 0) {
				dispatch(fetchProductType());
			}
		}
	}, [isFetched, isLoadingCategory, isLoadingProductType,
		dispatch, productTypes.length, categories.length,
		isLoadingProductCard, productCard, productParam]);

	useEffect(() => {
		
		if (createdId) {
			const newItems = chars.filter(item => item.new);
			if (newItems.length > 0) {
				dispatch(addCharacteristic(newItems.map(item => {
					return {name: item.property, description: item.value, product: createdId};
				})));				
			}
			dispatch(clearId());
			navigateMenu();
		}
	}, [createdId, chars, dispatch, navigateMenu, productParam, productCard, acceptClicked]);

	useEffect(() => {
		if (isFetched && productParam && productCard && productCard.characteristics.length > 0) {
			const newFeatures = productCard.characteristics.map(item => {
				return {property: item.name, value: item.description, id: item.char_id, update: false};
			});

			setChars(newFeatures);
		}
	}, [productCard, isFetched, productParam]);

	useEffect(() => {
		if (productCard && productCard?.slug === productParam) {
			setName(productCard.name);
			setDescription(productCard.description);
			setPrice(String(productCard.price));
			setCode(productCard.code);					
		}	
	}, [productCard, productParam]);
		
	return (
		
		<section>
			{isLoadingProductCard || !isFetched? <Spinner/>:

				productCard || newItem?
					<>
						<HelmetProvider>
							<Helmet>
								<title>{productParam? 'Карточка товара': 'Новая карточка товара'}</title>
							</Helmet>
						</HelmetProvider>
						<AdminPageHead>
							{productParam? 'Карточка товара': 'Новая карточка товара'}
						</AdminPageHead>

						<NewItemLayout dark={false} className={cn(styles['products-items'], className)}>

							<div className={cn(styles['main-info'])}>
								<ItemCardInputArea dark={true} className={cn(styles['input-small'])}>
									<ItemCardInputLabel dark={false}>Код товара:</ItemCardInputLabel>
									<ItemCardInput dark={false} onChange={onChangeCode} errors={acceptClicked && !code}
										placeholder='Код товара...' value={code}/>    			
								</ItemCardInputArea>			
					
								<ItemCardInputArea dark={true} className={cn(styles['input-big'])}>
									<ItemCardInputLabel dark={false}>Название:</ItemCardInputLabel>
									<ItemCardInput dark={false} onChange={onChangeName} errors={acceptClicked && !name}
										placeholder='Название...' value={name}/>    			
								</ItemCardInputArea>

								<ItemCardInputArea dark={true} className={cn(styles['input-small'])}>
									<ItemCardInputLabel dark={false}>Цена:</ItemCardInputLabel>
									<ItemCardInput dark={false} type='number' onChange={onChangePrice}
										errors={acceptClicked && !price} placeholder='Цена...'
										value={price}/>    			
								</ItemCardInputArea>

							</div>

							<div className={cn(styles['second-info'])}>
								<div className={cn(styles['info-part'])}>

									<ItemCardInputArea dark={true} className={cn(styles['desc'])}>
										<ItemCardInputLabel dark={false}>Описание: </ItemCardInputLabel>
										<ItemCardAreaInput dark={false} placeholder='Описание...' value={description}
											errors={acceptClicked && !description} className={cn(styles['area-input'])}
											onChange={onChangeDescription} />    			
									</ItemCardInputArea>
								
									<div className={cn(styles['images'])}>
										<ItemImagePreview dark={true} errors={acceptClicked && !image} image={productParam && !image? productCard?.image: image} onChange={onChangeImage} imageClassName={cn(styles['main-image'])}/>
										<ItemImagePreview dark={true} image={productParam && !secondImage? productCard?.second_image: secondImage}							
											onChange={onChangeSecondImage} title='Допольнительное изображение 1:' imageClassName={cn(styles['second-image'])}/>
										<ItemImagePreview dark={true} image={productParam && !thirdImage? productCard?.third_image: thirdImage}
											onChange={onChangeThirdImage} title='Допольнительное изображение 2:' imageClassName={cn(styles['second-image'])}/>
									</div>
								</div>

								<div className={cn(styles['info-part'])}>
									{ productTypes.length > 0 &&

							<ItemsSelector defaultOption={productParam && category? String(productTypes.find(item => item.id === Number(category))?.name): 'Вид товара'}
								optionLabels={productTypes.map(item => {
									return {id: Number(item.id), name: String(item.name)};
								})} onChangeOption={onChangeProductType}
								small={true}/>					
									}
									{ categories.length > 0 &&
							<ItemsSelector defaultOption={productParam && subcategory? String(categories.find(item => item.id === Number(subcategory))?.name): 'Выбрать категорию'}
								optionLabels={ productType?
									categories.filter(item => item.parent === Number(productType))
										.map(item => {
											return {id: Number(item.id), name: String(item.name)};
										})
									: categories.map(item => {
										return {id: Number(item.id), name: String(item.name)};
									})} onChangeOption={onChangeCategory}
								small={true}/>
									}
									{ subcategories.length > 0 &&
							<ItemsSelector defaultOption={productParam? String(subcategories.find(item => item.id === productCard?.category)?.name): 'Выбрать подкатегорию'}
								optionLabels={ category? 
									subcategories.filter(item => item.parent === Number(category))
										.map(item => {
											return {id: Number(item.id), name: String(item.name)};
										})
									:
									
									subcategories.map(item => {
										return {id: Number(item.id), name: String(item.name)};
									})
								} onChangeOption={onChangeSubCategory} selectErrors={acceptClicked && !subcategory}
								small={true}/>
									}
							
								</div>

							</div>
					
							<ItemCardTitle dark={true}>
						Характеристики
							</ItemCardTitle>

							{
								chars.length > 0 && chars.map((item, index) => (
									<ItemCardCharacteristic key={item.id} charItem={item} orderNumber={index}
										acceptClicked={acceptClicked} onChangeChars={typeof item.update === 'boolean'? onChangeUpdatedChars: onChangeChars} onClickDelete={onClickDelete}
										existChar={typeof item.update === 'boolean'} onDeleteCharacteristic={onDeleteCharacteristic}/>
								))
							}	

										
							<AddItemButton shape='circle' className={cn(styles['action-btn'])}
								onClick={onClickAdd}>
								{addItemPlus()}
							</AddItemButton>
					
				
							<div className={cn(styles['action-btns'])}>
								<SaveDeleteButton typeAction='accept' onClick={onClickSubmit}/>
								{ productParam &&
									<SaveDeleteButton typeAction='delete' onClick={onClickDeleteProduct}/>
								}						
							</div>
					
							<ModalAskDelete isOpen={isDeleteClicked} closeModal={onClickDeleteProduct}
								message={`продукт "${productCard?.name}"`} idItem={productCard?.product_id}
								onDelete={onDeleteProduct}/>									
						</NewItemLayout>
				
					</>
					:<Error/>
			}
		</section>
	
	);

}

export default CreateProduct;

