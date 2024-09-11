
import styles from './CategoryList.module.css';
import { CategoryListProps } from './CategoryList.props';
import cn from 'classnames';
import CategoryListItem from '../CategoryListItem/CategoryListItem';
import { useEffect, useState } from 'react';
import { RootState, selectFilteredCategory } from '../../../store';
import { fetchCategory, SubCategoryState } from '../../../slices/categorySlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import SubCategoryList from '../SubCategoryList/SubCategoryList';
import { catalog, renderArrow } from '../../../utils/constants';


function CategoryList({onClickLink, className}: CategoryListProps) {

	const dispatch = useAppDispatch();
	const categories = useAppSelector((state: RootState) => selectFilteredCategory(state));
	const {categories: categoriesDefault, isLoading }  = useAppSelector((state: RootState) => state.categories);
	const [isFetched, setIsFetched] = useState<boolean>(false);
	const [subActive, setSubActive] = useState<string | null>(null);

	useEffect(() => {
		if (!isFetched) {
			setIsFetched(true);
			if (categoriesDefault.length === 0 && !isLoading) {
				dispatch(fetchCategory());
			}
		}
	}, [dispatch, categoriesDefault.length, isLoading, isFetched]);

	

	const renderSubcategories = (subcategory: SubCategoryState[]) => (
		
		subcategory.length > 0 &&
		<SubCategoryList>
			{ subcategory
				.map((subcat, index, array) => (
					<CategoryListItem
						key={subcat.name}
						borderItem={index !== array.length - 1}
						link={catalog+subcat.slug}
						onClickLink={onClickLink}
					>
						{subcat.name}
					</CategoryListItem>
				))}
		</SubCategoryList>
	);

	const renderCategories = () => (
		<ul>
			{categories.length > 0 && categories.filter((item) => item.is_show).map((item, index, array) => (
				<CategoryListItem
					key={item.name}
					name={item.name}
					showSub={subActive === item.name}
					onMouseEnter={() => setSubActive(item.name)}
					subcategory={renderSubcategories(item.subcategory)}
					borderItem={index !== array.length - 1}
					link={catalog+item.slug}
					onClickLink={onClickLink}
				>
					{item.name} {renderArrow()}
				</CategoryListItem>
			))}
		</ul>
	);

	return (
		<div
			className={cn(styles['category-list'], className)}
			onMouseLeave={() => setSubActive(null)}
		>
			<nav>{renderCategories()}</nav>
		</div>
	);
}

export default CategoryList;