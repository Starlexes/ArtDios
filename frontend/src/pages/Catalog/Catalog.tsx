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
import Error from '../Error/Error';
import Pagination from '../../components/Pagination/Pagination';
import ProductList from '../../components/Products/ProductList/ProductList';
import { itemsPerPage } from '../../utils/constants';
import SortingOrder from '../../components/Filters/SortingOrder/SortingOrder';
import { fetchCharacteristic } from '../../slices/characteristicSlice';
import CharsFilter from '../../components/Filters/CharsFilter/CharsFilter';


function Catalog({className}: CatalogProps) {

	const { category: catParam} = useParams<{ category: string }>();

	const { products, isLoading } = useAppSelector((state: RootState) => state.products);

	const [currentCategory, setCurrentCategory] = useState<string | undefined>('');

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const page = searchParams.get('p');

	const chars = useAppSelector((state: RootState) => convertedChars(state));

	const sortBy: Sorting = searchParams.get('sort-by') as Sorting;

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

	const categoryName = useMemo(() => {
		return products[0]?.category_name;
	}, [products]);


	useEffect(() => {
		if (currentCategory !== catParam || sortBy) {
			setCurrentCategory(catParam);
			dispatch(fetchProduct({ category: catParam, sortBy: sortBy }));
			dispatch(fetchCharacteristic({ category: catParam}));
		}
	}, [dispatch, catParam, currentCategory, sortBy]);
		
	return (
		
		isLoading? <Spinner/>:

			!products.length? <Error/>:
				<section>
					<div className={cn(styles['catalog'], className)}>
						<PageHead>
							{categoryName}
						</PageHead>

						<SortingOrder/>

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
							<CharsFilter chars={chars}/>
						</div>
					</div>	
				</section>	
	);
}

export default Catalog;