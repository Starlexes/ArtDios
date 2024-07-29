
import NavItem from '../NavItem/NavItem';
import styles from './CategoryListItem.module.css';
import { CategoryListItemProps } from './CategoryListItem.props';
import cn from 'classnames';

function CategoryListItem({name, link, className,
	subcategory, children, showSub,
	onMouseEnter, onMouseLeave}: CategoryListItemProps) {


	return (
		<li>
			<NavItem to={link} className='category'>
				<div className={cn(styles['list-item'], {
					[styles['border-item']]: className === 'border-item'
				})} onMouseEnter={onMouseEnter ? () => onMouseEnter(name) : undefined}
				onMouseLeave={onMouseLeave}
				>
					{ children}			
				</div>
			</NavItem>
			
			{showSub && subcategory}
			
		</li>
				
	);
}

export default CategoryListItem;