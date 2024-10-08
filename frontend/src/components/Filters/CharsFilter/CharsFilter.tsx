import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import ActionsFilter from '../ActionsFilter/ActionsFilter';
import PriceFilter from '../PriceFilter/PriceFilter';
import PropertyFilter from '../PropertyFilter/PropertyFilter';
import styles from './CharsFilter.module.css';
import { CharsFilterProps } from './CharsFilter.props';
import cn from 'classnames';
import { setSubmitClick } from '../../../slices/buttonSlice';
import { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../Header/Button/Button';
import { closeFilters } from '../../../utils/constants';
import { useMediaPredicate } from 'react-media-hook';

function CharsFilter({minPrice, maxPrice, chars,
	className, closeModal, productLength, isAdmin=false, category }: CharsFilterProps) {
	const {isClicked, filterparams} = useAppSelector((state: RootState) => state.buttons.actionSubmitButton);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	
	const {maxPrice: maxPriceParam, minPrice: minPriceParam, chars: charsParam, category: catParam} = filterparams; 
	const url = location.pathname;	
	const searchParams = new URLSearchParams(location.search);
	const maxPriceSearch = searchParams.get('max-price');
	const minPriceSearch = searchParams.get('min-price');
	const searchResults= searchParams.get('s');


	const mediaMatches = useMediaPredicate('(min-width: 881px)');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isClicked) {			
			const convertedChars = new URLSearchParams(
				charsParam?.map(item => ['characteristic', `${item.name}:${item.description}`])
			);
			const convertedCats = isAdmin && catParam && catParam.length > 0? new URLSearchParams(
				catParam?.map(item => ['category', item])
			): null;
			const searchRoute = searchResults? `s=${searchResults}`: '';
			const priceRoute = productLength > 1? `${searchRoute? '&': ''}min-price=${minPriceParam}&max-price=${maxPriceParam}`: '';
			navigate(`${url}?${searchRoute}${priceRoute}${convertedCats? `&${convertedCats}`: ''}${charsParam?.length? `&${convertedChars}`: ''}`);
			dispatch(setSubmitClick(false));
			!mediaMatches && closeModal && closeModal();
		}
	};

	return (
		<aside>
			<div className={cn(styles['main-filter'], className)}>

				{!mediaMatches &&
					<Button onClick={closeModal} className={cn(styles['close-filters'])}>
						{closeFilters()}
					</Button>
				}
				<h2 className={cn(styles['filters-title'])}>Фильтр</h2>

				<form onSubmit={handleSubmit} className={cn(styles['filters-form'])}>

					{productLength > 1 && 						
						<PriceFilter minVal={minPrice} maxVal={maxPrice} maxPriceSearch={maxPriceSearch} minPriceSearch={minPriceSearch}/>
					}
					{ isAdmin && category && category.length > 0 &&
					
						<PropertyFilter category={category} />
											
					}
					

					{chars.length > 0 && chars.map((item, index) => (
						<PropertyFilter item={item} key={index}/>
					))}
										
					
					<ActionsFilter/>
				</form>
				
			</div>
		</aside>
	);
}

export default CharsFilter;