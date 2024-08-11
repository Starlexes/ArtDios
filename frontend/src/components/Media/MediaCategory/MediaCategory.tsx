
import styles from './MediaCategory.module.css';
import { MediaCategoryProps } from './MediaCategory.props';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { RootState } from '../../../store';
import { fetchCategory, SubCategoryState } from '../../../slices/categorySlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import MediaCategoryItem from '../MediaCategoryItem/MediaCategoryItem';
import { renderArrow } from '../../../utils/constants';
import MediaSubCategory from '../MediaSubCategory/MediaSubCategory';


function MediaCategory({onClose, className }: MediaCategoryProps) {
	const dispatch = useAppDispatch();
	const { categories, isLoading } = useAppSelector((state: RootState) => state.categories);
  
	const [subActive, setSubActive] = useState<boolean>(false);

	const [currentSubCategory, setCurrentSubCategory] = useState<SubCategoryState[] | null>(null);

	const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  
	const onClick = (subcategory: SubCategoryState[], category: string) => {
		setCurrentSubCategory(subcategory);
		setSubActive(true);
		setCurrentCategory(category);
	};

	const onCloseSubcategory = () => {
		setSubActive(false);
		setCurrentSubCategory(null);
	};

	useEffect(() => {
		if (categories.length === 0 && !isLoading) {
			dispatch(fetchCategory());
		}
	}, [dispatch, categories.length, isLoading]);

	return (
		<div className={cn(styles['category-list'], className)}>
			<nav>
				<ul>
					{categories.filter((item) => item.is_show).map((item, index, array) => (
						<MediaCategoryItem
							key={item.name}
							name={item.name}
							borderItem={index !== array.length - 1}
							onClick={() => onClick(item.subcategory, item.slug)}
						>
							{item.name} {renderArrow()}
						</MediaCategoryItem>
					))}
				</ul>
			</nav>
			<MediaSubCategory isOpen={subActive} subcategory={currentSubCategory}
				onClose={onCloseSubcategory}
				onCloseCategory={onClose}
				category={currentCategory}/>
		</div>
	);
}

export default MediaCategory;