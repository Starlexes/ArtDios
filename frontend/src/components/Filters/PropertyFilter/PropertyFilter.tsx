
import { useEffect, useState } from 'react';
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

function PropertyFilter({item, className }: PropertyFilterProps) {

	const [showMore, setShowMore] = useState(false);
	const [visibleParamsCount, setVisibleParamsCount] = useState(countChars);
	const {chars} = useAppSelector((state: RootState) => state.buttons.actionSubmitButton.filterparams);
	const dispatch = useDispatch();
	const itemsLength = item.description.length;
	const itemName = item.name;

	const handleShowMore = () => {
		setShowMore(!showMore);
		setVisibleParamsCount(showMore ? countChars : itemsLength);
	};

	useEffect(() => {
		!showMore && item.description.slice(visibleParamsCount).map((desc) => {
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
	}, [showMore, chars, dispatch, item.description, itemName, visibleParamsCount]);

	return (
		
		<div className={cn(styles['property'], className)}>
			<PropertyTitle>{item.name}</PropertyTitle>
			<div className={cn(styles['property-item'])}>
				<ul>
					<div className={cn(styles['filter-list'])}>
						{item.description.slice(0, visibleParamsCount).map((desc, index) => 
							(
								<NavigationListItem key={index} className={cn(styles['list-item'])}>
									<CheckBoxFilter name='filter' desc={desc} propertyName={itemName}/>	
								</NavigationListItem>
							)
						)}
					</div>
				</ul>
			</div>
			{itemsLength > countChars &&
			<Button className={cn(styles['show-btn'])} onClick={handleShowMore}>
				{showMore ? 'Свернуть' : 'Показать еще'}				
			</Button>
			}
		</div>
	);
}

export default PropertyFilter;
