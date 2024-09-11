
import { useEffect, useRef, useState } from 'react';
import NavigationListItem from '../../Header/NavigationListItem/NavigationListItem';
import CheckBoxFilter from '../CheckBoxFilter/CheckBoxFilter';
import PropertyTitle from '../PropertyTitle/PropertyTitle';
import styles from './PropertyFilter.module.css';
import { PropertyFilterProps } from './PropertyFilter.props';
import cn from 'classnames';
import { countChars } from '../../../utils/constants';
import Button from '../../Header/Button/Button';
import { RootState } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { setSubmitFilterParams } from '../../../slices/buttonSlice';
import { useDispatch } from 'react-redux';

function PropertyFilter({item, className, category}: PropertyFilterProps) {

	const {chars} = useAppSelector((state: RootState) => state.buttons.actionSubmitButton.filterparams);
	
	const [visibleParamsCount, setVisibleParamsCount] = useState(countChars);
	const itemsLength = category? category[0].name.length: item? item.description.length: 0;
	const [markedItem, setMarkedItem] = useState<boolean>(chars?
		chars.some(obj => item?.description.slice(visibleParamsCount).includes(obj.description)): false);
	
	const [showMore, setShowMore] = useState(markedItem);
	const [maxHeight, setMaxHeight] = useState('none');
	const dispatch = useDispatch();

	const blockRef = useRef<HTMLDivElement | null>(null);

	const itemName = item?.name;

	const filterPropertyValues = () => {
			
		return category? category.map(cat => (
			<NavigationListItem key={cat.id}>
				<CheckBoxFilter name='filter' propertyName={cat.name} desc={cat.slug} isCategory={true}/>	
			</NavigationListItem>
		)) 
			:			
																		
			item?.description.slice(0, visibleParamsCount).map((desc, index) => 
				filterContent(index, desc)
			);	
		
	};

	const handleShowMore = () => {
		setShowMore(!showMore);	
		setMarkedItem(false);
		setVisibleParamsCount(showMore? countChars : itemsLength);
		showMore? setMaxHeight('none'): handleFixHeight();
	};

	const filterContent = (index: number, desc: string) => (
		<NavigationListItem key={index}>
			<CheckBoxFilter name='filter' desc={desc} propertyName={itemName as string}/>	
		</NavigationListItem>
	);

	const handleFixHeight = () => {
		if (blockRef.current) {
			const currentHeight = blockRef.current.offsetHeight;
			setMaxHeight(`${currentHeight}px`);
		}
	};

	useEffect(() => {
		if (markedItem) {
			setVisibleParamsCount(itemsLength);
		}
	}, [markedItem, itemsLength]);


	useEffect(() => {
		!showMore && item?.description.slice(visibleParamsCount).map((desc) => {
			const exists = chars?.some(obj => 
				obj.name === itemName && obj.description === desc
			);
			if (exists) {
				const updatedArray = chars?.filter(obj => 
					!(obj.name === itemName && obj.description === desc)
				);
						
				dispatch(setSubmitFilterParams({ chars: updatedArray }));
			}
		});
							
	}, [showMore, chars, dispatch, item?.description,
		itemName, visibleParamsCount, category]);

	return (
		
		<div className={cn(styles['property'], className)}>
			<PropertyTitle>{category? 'Категории товаров:': `${item?.name}:` as string}</PropertyTitle>
			<div className={cn(styles['property-item'])}>
				<ul>
					<div className={cn(styles['filter-list'], {
						[styles['category-list']]: category,
						[styles['filter-scroll']]: visibleParamsCount != countChars						
					})} ref={blockRef}
					style={{
						maxHeight: maxHeight
					}}
					>
												
						{filterPropertyValues()	}
					</div>
				</ul>
			</div>
			{!category && itemsLength > countChars &&
			<Button className={cn(styles['show-btn'])} onClick={handleShowMore}>
				{showMore ? 'Свернуть' : 'Показать еще'}				
			</Button>
			}
		</div>
	);
}

export default PropertyFilter;
