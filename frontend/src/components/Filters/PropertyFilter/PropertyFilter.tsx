
import { useState } from 'react';
import NavigationListItem from '../../Header/NavigationListItem/NavigationListItem';
import CheckBoxFilter from '../CheckBoxFilter/CheckBoxFilter';
import PropertyTitle from '../PropertyTitle/PropertyTitle';
import styles from './PropertyFilter.module.css';
import { PropertyFilterProps } from './PropertyFilter.props';
import cn from 'classnames';
import { countChars } from '../../../utils/constants';
import Button from '../../Header/Button/Button';

function PropertyFilter({item, className }: PropertyFilterProps) {

	const [showMore, setShowMore] = useState(false);
	const [visibleParamsCount, setVisibleParamsCount] = useState(countChars);

	const itemsLength = item.description.length;
	const itemHeight = 26.5;
	const charHeight = itemHeight * countChars;

	const handleShowMore = () => {
		setShowMore(!showMore);
		setVisibleParamsCount(showMore ? countChars : itemsLength);
	};

	return (
		
		<div className={cn(styles['property'], className)}>
			<PropertyTitle>{item.name}</PropertyTitle>
			<div className={cn(styles['property-item'])}>
				<ul>
					<div className={cn(styles['filter-list'])} style={{ maxHeight: `${charHeight}px` }}>
						{item.description.slice(0, visibleParamsCount).map((desc, index) => 
							(
								<NavigationListItem key={index}>
									<CheckBoxFilter name='filter' desc={desc}/>	
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