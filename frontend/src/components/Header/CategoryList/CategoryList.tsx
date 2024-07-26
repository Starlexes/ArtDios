
import styles from './CategoryList.module.css';
import { CategoryListProps } from './CategoryList.props';
import cn from 'classnames';
import CategoryListItem from '../CategoryListItem/CategoryListItem';
import { useEffect, useState } from 'react';
import { RootState } from '../../../store';
import { fetchCategory, SubCategoryState } from '../../../slices/categorySlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import SubCategoryList from '../SubCategoryList/SubCategoryList';

function CategoryList({isActive=false, className}: CategoryListProps) {

	const dispatch = useAppDispatch();
	const categories = useAppSelector((state: RootState) => state.categories);

	const arrow = (<svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="1.41406" width="10" height="2" rx="1" transform="rotate(45 1.41406 0)" fill="white"/>
		<rect y="13.0703" width="10" height="2" rx="1" transform="rotate(-45 0 13.0703)" fill="white"/>
	</svg>);

	const [subActive, setSubActive] = useState<string | null>(null);

	const subcategories = (subcategory: SubCategoryState[]) => {
		return (
			<SubCategoryList>
				{subcategory
					.filter((item) => item.is_show)
					.map((subcat, index, array) => (
						index === array.length - 1 ? (
							<CategoryListItem key={subcat.name} link={subcat.slug}>
								{subcat.name}
							</CategoryListItem>
						) : (
							<CategoryListItem key={subcat.name} className='border-item' link={subcat.slug}>
								{subcat.name}
							</CategoryListItem>
						)
					))
				}
			</SubCategoryList>
		);
	};
		

	useEffect(() => {
		dispatch(fetchCategory());
	}, [dispatch]);


	return (
		
		<div className={cn(styles['category-list'], {
	
			[styles['active']]: isActive
		}, className)} onMouseLeave={() => setSubActive(null)}>
			<nav>
				<ul>
					{categories.filter((item) => item.is_show).map((item, index, array) => (
		
						index === array.length - 1 ? (
								
							<CategoryListItem
								name={item.name}
								showSub={subActive === item.name}
								onMouseEnter={() => setSubActive(item.name)}
									
								subcategory={subcategories(item.subcategory)}
								key={item.name}
								link={item.slug}
							>
								{item.name} {arrow}
							</CategoryListItem>
						) : (
							<CategoryListItem name={item.name}
								showSub={subActive === item.name}
								onMouseEnter={() => setSubActive(item.name)}
									
								subcategory={subcategories(item.subcategory)}
								key={item.name}
								className='border-item'
								link={item.slug}>
								{item.name} {arrow}
							</CategoryListItem>
						)	
							
					))}

				</ul>
			</nav>
				
		</div>

			
	
	);
}

export default CategoryList;