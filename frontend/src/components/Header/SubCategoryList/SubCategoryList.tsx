
import styles from './SubCategoryList.module.css';
import { SubCategoryListProps } from './SubCategoryList.props';
import cn from 'classnames';


function SubCategoryList({isActive=false, className, children}: SubCategoryListProps) {

	return (
		<div className={cn(styles['subcategory'], {
	
			[styles['active']]: isActive
		}, className)}>
			<nav>
				<ul>
					{children}
				</ul>
			</nav>
		</div>
			
	);
}

export default SubCategoryList;