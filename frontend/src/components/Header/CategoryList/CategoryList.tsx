
import styles from './CategoryList.module.css';
import { CategoryListProps } from './CategoryList.props';
import cn from 'classnames';
import CategoryListItem from '../CategoryListItem/CategoryListItem';
import { useEffect, useState } from 'react';
import { RootState } from '../../../store';
import { fetchCategory, SubCategoryState } from '../../../slices/categorySlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import SubCategoryList from '../SubCategoryList/SubCategoryList';
import { renderArrow } from '../../../utils/constants';


function CategoryList({isActive=false, className}: CategoryListProps) {

	const dispatch = useAppDispatch();
	const { categories, isLoading }  = useAppSelector((state: RootState) => state.categories);

	const [subActive, setSubActive] = useState<string | null>(null);

	useEffect(() => {
		if (categories.length === 0 && !isLoading) {
			dispatch(fetchCategory());
		}
	}, [dispatch, categories.length, isLoading]);

	

	const renderSubcategories = (subcategory: SubCategoryState[]) => (
		<SubCategoryList>
			{subcategory
				.filter((item) => item.is_show)
				.map((subcat, index, array) => (
					<CategoryListItem
						key={subcat.name}
						borderItem={index !== array.length - 1}
						link={subcat.slug}
					>
						{subcat.name}
					</CategoryListItem>
				))}
		</SubCategoryList>
	);

	const renderCategories = () => (
		<ul>
			{categories.filter((item) => item.is_show).map((item, index, array) => (
				<CategoryListItem
					key={item.name}
					name={item.name}
					showSub={subActive === item.name}
					onMouseEnter={() => setSubActive(item.name)}
					subcategory={renderSubcategories(item.subcategory)}
					borderItem={index !== array.length - 1}
					link={item.slug}
				>
					{item.name} {renderArrow()}
				</CategoryListItem>
			))}
		</ul>
	);

	return (
		<div
			className={cn(styles['category-list'], { [styles['active']]: isActive }, className)}
			onMouseLeave={() => setSubActive(null)}
		>
			<nav>{renderCategories()}</nav>
		</div>
	);
}

export default CategoryList;