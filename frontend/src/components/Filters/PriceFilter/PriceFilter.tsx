import { FormEvent, useEffect, useState } from 'react';
import Input from '../../Header/Input/Input';
import PropertyTitle from '../PropertyTitle/PropertyTitle';
import styles from './PriceFilter.module.css';
import { PriceFilterProps } from './PriceFilter.props';
import cn from 'classnames';
import ReactSlider from 'react-slider';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import { useDispatch } from 'react-redux';
import { setClearClick, setSubmitFilterParams} from '../../../slices/buttonSlice';


function PriceFilter({minPriceSearch, maxPriceSearch, minVal, maxVal, className }: PriceFilterProps) {

	const [minPrice, setMinPrice] = useState<string>('');
	const [maxPrice, setMaxPrice] = useState<string>('');
	
	const {isClicked} = useAppSelector((state: RootState) => state.buttons.actionClearButton);
	const dispatch = useDispatch();
 
	const handleChange = (event: FormEvent<HTMLInputElement>) => {
		if (event.currentTarget.value === '' ||  ( !isNaN(Number(event.currentTarget.value)) && Number(event.currentTarget.value) >= 0)) {
			
			const {value, name} = event.currentTarget;
			if (name === 'min-price') {
				setMinPrice(value);
				
			} else {
				setMaxPrice(value);
			
			}
		}
	};

	const onBlur = (event: FormEvent<HTMLInputElement>) => {
		
		const value = event.currentTarget.value.replace(/(^0{2,})|(^0(?=\d))/, '');
		const name = event.currentTarget.name;
		if (name === 'min-price') {
			
			if(Number(value) > Number(maxPrice)) {
				setMinPrice(maxPrice);
	
				
			} else if (!Number(value) || Number(value) < Number(minVal)) {
				setMinPrice(minVal);
		
			}
			
			else{			
				setMinPrice(value);
			}
		} else {
			if(Number(value) < Number(minPrice)) {
				setMaxPrice(minPrice);
				
			
			} else if (!Number(value) || Number(value) > Number(maxVal)) {
				setMaxPrice(maxVal);
		
			}
			
			else {
				setMaxPrice(value);
				
			}
		}
		
	};

	useEffect(() => {
		if (minPriceSearch && maxPriceSearch && !minPrice && !maxPrice) {
			setMinPrice(minPriceSearch);
			setMaxPrice(maxPriceSearch);
		}
		dispatch(setSubmitFilterParams({maxPrice: maxPrice, minPrice: minPrice}));
	}, [dispatch, minPriceSearch, maxPriceSearch, maxPrice, minPrice]);

	useEffect(() => {
		if (isClicked) {
			setMinPrice(minVal);
			setMaxPrice(maxVal);
			dispatch(setClearClick(false));
			dispatch(setSubmitFilterParams({maxPrice: maxVal, minPrice: minVal}));
		} 

		if ((!minPriceSearch || !maxPriceSearch) && !minPrice && !maxPrice) {
			setMinPrice(minVal);
			setMaxPrice(maxVal);
		}
		
	}, [isClicked, minVal, maxVal, dispatch ,
		minPriceSearch, maxPriceSearch, maxPrice, minPrice]);

	useEffect(() => {
		if (minVal && maxVal && !minPriceSearch && !maxPriceSearch) {
			setMinPrice(minVal);
			setMaxPrice(maxVal);
			
		}
	}, [minVal, maxVal, minPriceSearch, maxPriceSearch]);
	
      
	return (
		
		<div className={cn(styles['price-filter'], className)}>
			
			<PropertyTitle>
                Цена
			</PropertyTitle>
			
			<ReactSlider
				min={Number(minVal)}
				max={Number(maxVal)}
				step={1}
				value={[Number(minPrice),
					Number(maxPrice)]}
				onChange={(values: number[]) => {
					setMinPrice(String(values[0]));
					setMaxPrice(String(values[1]));
				}}
				className={cn(styles['range-slider'])}
				thumbClassName={styles['slider-thumb']}
				renderTrack={(props) => {
	

					const percent1 = ((Number(minPrice) - Number(minVal)) / (Number(maxVal) - Number(minVal))) * 100;
					const percent2 = ((Number(maxPrice) - Number(minVal)) / (Number(maxVal) - Number(minVal))) * 100;

					const colorPassed = '#E0E0E0';
					const backgroundColor = `linear-gradient(to right, 
                    ${colorPassed} ${percent1}%, 
                    #333333 ${percent1}%, 
                    #333333 ${percent2}%, 
                    ${colorPassed} ${percent2}%)`;
					return (
						<div
							{...props}
							key={props.key}
							className={styles['slider-track']}
							style={{
								background: backgroundColor
							}}
						/>
					);
				}}
				
			/>
		
			<div className={cn(styles['price-input'])}>
				<Input onInput={handleChange} className={cn(styles['price'], styles['min-price'])}
					type="number"
					value={minPrice} name='min-price'
					onBlur={onBlur}/>
				<Input onInput={handleChange} className={cn(styles['price'], styles['max-price'])}
					type="number"
					value={maxPrice} name='max-price'
					onBlur={onBlur}/>
			</div>
		</div>
		
	);
}

export default PriceFilter;