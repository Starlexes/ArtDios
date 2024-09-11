import styles from './Catalog.module.css';
import cn from 'classnames';
import { CatalogProps } from './Catalog.props';
import { useLocation, useParams } from 'react-router-dom';
import PageHead from '../../components/PageHead/PageHead';
import { convertedChars, RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useMemo, useState } from 'react';
import { deleteProducts, fetchProduct, Sorting } from '../../slices/productSlice';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from '../../components/Pagination/Pagination';
import ProductList from '../../components/Products/ProductList/ProductList';
import { itemsPerPage } from '../../utils/constants';
import SortingOrder from '../../components/Filters/SortingOrder/SortingOrder';
import { fetchCharacteristic } from '../../slices/characteristicSlice';
import CharsFilter from '../../components/Filters/CharsFilter/CharsFilter';
import { useMediaPredicate } from 'react-media-hook';
import SortingOrderMedia, { OptionType } from '../../components/Filters/Media/SortingOrderMedia/SortingOrderMedia';
import CatalogActions from '../../components/Filters/Media/CatalogActions/CatalogActions';
import FiltersButton from '../../components/Filters/Media/FiltersButton/FiltersButton';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { clearSubmitFilterParams } from '../../slices/buttonSlice';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import ItemActions from '../../admin-components/ItemActions/ItemActions';
import ItemActionButton from '../../admin-components/ItemActionButton/ItemActionButton';
import { fetchCategory } from '../../slices/categorySlice';
import ItemsSelector from '../../admin-components/ItemsSelector/ItemsSelector';
import { SingleValue } from 'react-select';
import ModalAskDelete from '../../admin-components/ModalAskDelete/ModalAskDelete';


function Catalog({className, isAdmin=false}: CatalogProps) {

	const { category: catParam} = useParams<{ category: string }>();
	const { products: productsGetting, isLoading } = useAppSelector((state: RootState) => state.products);
	const {categories} = useAppSelector((state: RootState) => state.categories);
	const {products, maxPrice, minPrice} = productsGetting;
	const [currentCategory, setCurrentCategory] = useState<string>('');
	const [currentSearchResults, setCurrentSearchResults] = useState<string>('');
	const [currentSearchParams, setCurrentSearchParams] = useState<string>('');
	const [isFetched, setIsFetched] = useState<boolean>(false);
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [productCount, setProductCount] = useState<number>(itemsPerPage);

	const [productDeleteCount, setProductDeleteCount] = useState<number>(0);
	const [productDeleteIds, setProductDeleteIds] = useState<number[]>([]);
	const [deleteProductsClicked, setDeleteProductsClicked] = useState<boolean>(false);

	const location = useLocation();
	
	const searchParams = new URLSearchParams(location.search);
	const page = searchParams.get('p');

	const categoryFilters = searchParams.getAll('category');

	const searchResults = searchParams.get('s');

	const chars = useAppSelector((state: RootState) => convertedChars(state));

	const screenMatches = useMediaPredicate('(min-width: 881px)');

	const sortBy: Sorting = searchParams.get('sort-by') as Sorting;
	const maxPriceParam = searchParams.get('max-price');
	const minPriceParam = searchParams.get('min-price');
	
	const charsParam = searchParams.getAll('characteristic');

	const currentPage = parseInt(page as string, 10) || 1;
	
	const totalPages = Math.ceil(products.length / productCount);
	const startIndex = (currentPage - 1) * productCount;	
	const endIndex = startIndex + productCount;
	const startlastItemsIndex = (totalPages - 1) * productCount;
	const endlastItemsIndex = startlastItemsIndex + productCount;

	const currentItems = products.slice(startIndex, endIndex);
	const lastItems = products.slice(startlastItemsIndex, endlastItemsIndex);
	const startItems = products.slice(0, productCount);

	const dispatch = useAppDispatch();

	const onClickSearch = () => {
		setIsSearching(!isSearching);
		if (isSearching) {
			setProductDeleteCount(0);
			setProductDeleteIds([]);
		}
	};

	const showProducts = () => {
		if (currentPage < 1) {
			return startItems;
		}
		else if (currentPage > totalPages) {
			return lastItems;
		}
		else {
			return currentItems;
		}
	};


	const categoryName = useMemo(() => {
		return products[0]?.category_name;
	}, [products]);

	const onChangeItemsCount = (option: SingleValue<OptionType>) => {
		setProductCount(Number(option?.label));
		window.scrollTo(0, 0);
	}; 

	const onClickDeleteProducts = () => {
		setDeleteProductsClicked(!deleteProductsClicked);
	};

	const addProductDelete = (id: number) => {
		setProductDeleteIds(ids => [...ids, id]);
	};

	const removeProductDelete = (id: number) => {
		setProductDeleteIds(ids => ids.filter(item => item !== id));
	};

	const addProductCount = () => {
		setProductDeleteCount(count => count+1);
	};

	const subProductCount = () => {
		setProductDeleteCount(count => count-1);
	};

	const onDeleteProducts = (ids: number[]) => {
		if (ids.length > 0) {
			dispatch(deleteProducts(ids));
			setProductDeleteCount(0);
			setProductDeleteIds([]);
		}
	};
	
	useEffect(() => {
		setIsFetched(false);		
	}, [location.search, catParam]);


	useEffect(() => {	
		if (!isFetched && !isLoading && (currentCategory !== catParam || (currentSearchParams !== location.search && !page))) {		
			setIsFetched(true);
			catParam && setCurrentCategory(catParam);
			searchResults && setCurrentSearchResults(searchResults);
			dispatch(fetchCharacteristic({ category: catParam}));
			isAdmin && dispatch(fetchCategory());
			setCurrentSearchParams(location.search);
			dispatch(fetchProduct({ 
				category: isAdmin && categoryFilters? categoryFilters: catParam , sortBy: sortBy,
				maxPrice: maxPriceParam, minPrice: minPriceParam,
				characteristic: charsParam, search: searchResults as string, admin: isAdmin
			}));	
		}

		if (categoryFilters.length === 0 && !maxPriceParam &&
			!minPriceParam && charsParam.length === 0 &&
			!sortBy &&
			(catParam && currentCategory !== catParam || searchResults
				&& currentSearchResults !== searchResults)) {
			dispatch(clearSubmitFilterParams());	
		}
	}, [dispatch, catParam, currentCategory,
		sortBy, searchParams.size, maxPriceParam,
		minPriceParam, charsParam, location.search,
		currentSearchParams, page, searchResults,
		isFetched, isLoading, isAdmin, categoryFilters,
		currentSearchResults]);
		
	return (
		
		isLoading && products.length === 0? <Spinner/>:

			<section>
				<HelmetProvider>
					<Helmet>
						<title>{isAdmin? 'Редактирование товаров': searchResults? 'Результаты поиска': categoryName}</title>
					</Helmet>
				</HelmetProvider>


				<div className={cn(styles['catalog'], className)}>
						
					{products.length > 0 || isAdmin?
						<>
							{ isAdmin? 
								<AdminPageHead className={cn(styles['page-head'])}>
									{searchResults? 'Результаты поиска': 'Редактирование товаров'}
								</AdminPageHead>
								:
								<PageHead>
									{searchResults? 'Результаты поиска': categoryName}
								</PageHead>
							}
							{ products.length > 1 && (
								screenMatches ? <SortingOrder/>: 
									<CatalogActions>
										<FiltersButton maxPrice={String(maxPrice)} minPrice={String(minPrice)}
											chars={chars} productLength={products.length}/>
										<SortingOrderMedia/>
									</CatalogActions>
							
							)
							}

							
							{isAdmin && products.length > 0 && 
								<ItemActions className={cn(styles['item-actions'])}>
											
									<ItemActionButton onClick={onClickSearch} roleAction='accept'>
										{!isSearching? 
											'Выбрать товар'
											: 'Выйти из режима выбора'
										}
									</ItemActionButton>

									{isSearching && 
										<>
											<ItemActionButton roleAction='static'>												
												Выбрано: {productDeleteCount}																						
											</ItemActionButton>

											<ItemActionButton onClick={onClickDeleteProducts} roleAction='delete'>												
												Удалить выбранное																					
											</ItemActionButton>
										</>
									}
															
								</ItemActions>
							}

							<div className={cn(styles['catalog-body'])}>

								<div className={cn(styles['product-items'])}>
									<ProductList products={showProducts()} isAdmin={isAdmin}
										addProductDelete={addProductDelete} removeProductDelete={removeProductDelete}
										isSearching={isSearching} addProductCount={addProductCount}
										subProductCount={subProductCount}/>

									{totalPages > 1 && 
									<Pagination
										totalPages={totalPages}
										url={location.pathname}
										currentPage={currentPage}
										params={location.search}
									/>
									}

									{
										isAdmin && products.length > 0 &&
										<div>
											<ItemsSelector onChangeOption={onChangeItemsCount} defaultOption='Товаров на странице'
												optionLabels={[
													{id: 10, name: '10'},
													{id: 50, name: '50'},
													{id: 100, name: '100'}
												]}/>
										</div>
										
									}
									
								</div>
								{ screenMatches && 
									<CharsFilter maxPrice={String(maxPrice)} minPrice={String(minPrice)}
										chars={chars} productLength={products.length} isAdmin={isAdmin}
										category={categories}/>
								}
							</div>
						</> : 
	
						<PageHead>
								Товары не найдены
						</PageHead>
					}
				</div>	

				{ isAdmin &&
					<ModalAskDelete isOpen={deleteProductsClicked} closeModal={onClickDeleteProducts}
						message={'выбранные товары'} idsItems={productDeleteIds}
						onDeleteMulty={onDeleteProducts}/>	
				}
			</section>	
		
			
	);
}

export default Catalog;