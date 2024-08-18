import styles from './Catalog.module.css';
import cn from 'classnames';
import { CatalogProps } from './Catalog.props';
import { useLocation, useParams } from 'react-router-dom';

import PageHead from '../../components/PageHead/PageHead';

import { convertedChars, RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useMemo, useState } from 'react';
import { fetchProduct, Sorting } from '../../slices/productSlice';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from '../../components/Pagination/Pagination';
import ProductList from '../../components/Products/ProductList/ProductList';
import { itemsPerPage } from '../../utils/constants';
import SortingOrder from '../../components/Filters/SortingOrder/SortingOrder';
import { fetchCharacteristic } from '../../slices/characteristicSlice';
import CharsFilter from '../../components/Filters/CharsFilter/CharsFilter';
import { useMediaPredicate } from 'react-media-hook';
import SortingOrderMedia from '../../components/Filters/Media/SortingOrderMedia/SortingOrderMedia';
import CatalogActions from '../../components/Filters/Media/CatalogActions/CatalogActions';
import FiltersButton from '../../components/Filters/Media/FiltersButton/FiltersButton';
import { Helmet, HelmetProvider } from 'react-helmet-async';



function Catalog({className}: CatalogProps) {

	const { category: catParam} = useParams<{ category: string }>();

	const { products: productsGetting, isLoading } = useAppSelector((state: RootState) => state.products);
	const {products, maxPrice, minPrice} = productsGetting;
	const [currentCategory, setCurrentCategory] = useState<string | undefined>('');
	const [currentSearchParams, setCurrentSearchParams] = useState<string | undefined>('');
	const [isError, setIsError] = useState<boolean>(true);

	const location = useLocation();
	
	const searchParams = new URLSearchParams(location.search);
	const page = searchParams.get('p');

	const chars = useAppSelector((state: RootState) => convertedChars(state));

	const screenMatches = useMediaPredicate('(min-width: 881px)');

	const sortBy: Sorting = searchParams.get('sort-by') as Sorting;
	const maxPriceParam = searchParams.get('max-price');
	const minPriceParam = searchParams.get('min-price');
	
	const charsParam = searchParams.getAll('characteristic');

	const currentPage = parseInt(page as string, 10) || 1;
	
	const totalPages = Math.ceil(products.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;	
	const endIndex = startIndex + itemsPerPage;
	const startlastItemsIndex = (totalPages - 1) * itemsPerPage;
	const endlastItemsIndex = startlastItemsIndex + itemsPerPage;

	const currentItems = products.slice(startIndex, endIndex);
	const lastItems = products.slice(startlastItemsIndex, endlastItemsIndex);
	const startItems = products.slice(0, itemsPerPage);

	const dispatch = useAppDispatch();

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

	useEffect(() => {
		
		if (isLoading && !products.length) {
			setTimeout(() => setIsError(false), 500);
		}
	}, [isError, isLoading, products.length]);

	const categoryName = useMemo(() => {
		return products[0]?.category_name;
	}, [products]);

	useEffect(() => {	
		if (currentCategory !== catParam || (currentSearchParams !== location.search && !page)) {		
			setCurrentCategory(catParam);
			dispatch(fetchCharacteristic({ category: catParam}));
			setCurrentSearchParams(location.search);
			dispatch(fetchProduct({ category: catParam, sortBy: sortBy,
				maxPrice: maxPriceParam, minPrice: minPriceParam,
				characteristic: charsParam
			}));
		}
	}, [dispatch, catParam, currentCategory,
		sortBy, searchParams.size, maxPriceParam,
		minPriceParam, charsParam, location.search, currentSearchParams, page]);
		
	return (
		
		isLoading && isError ? <Spinner/>:

			<section>
				<HelmetProvider>
					<Helmet>
						<title>{categoryName}</title>
					</Helmet>
				</HelmetProvider>
				<div className={cn(styles['catalog'], className)}>
						
					{products.length?
						<>
							<PageHead>
								{categoryName}
							</PageHead>
							
							{screenMatches? <SortingOrder/>: 
								<CatalogActions>
									<FiltersButton maxPrice={String(maxPrice)} minPrice={String(minPrice)} chars={chars}/>
									<SortingOrderMedia/>
								</CatalogActions>
							}

							<div className={cn(styles['catalog-body'])}>

								<div className={cn(styles['product-items'])}>
									<ProductList products={showProducts()}/>

									{totalPages > 1 && 
									<Pagination
										totalPages={totalPages}
										url={location.pathname}
										currentPage={currentPage}
										params={location.search}
									/>
									}
								</div>
								{ screenMatches &&
									<CharsFilter maxPrice={String(maxPrice)} minPrice={String(minPrice)} chars={chars}/>
								}
							</div>
						</> : <PageHead>
									Товары не найдены
						</PageHead>
					}
				</div>	
			</section>	
				
			
	);
}

export default Catalog;