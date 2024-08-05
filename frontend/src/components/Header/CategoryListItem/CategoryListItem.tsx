
import NavItem from '../NavItem/NavItem';
import styles from './CategoryListItem.module.css';
import { CategoryListItemProps } from './CategoryListItem.props';
import cn from 'classnames';

function CategoryListItem({name, link, className,
	subcategory, children, showSub,
	onMouseEnter, onMouseLeave, borderItem}: CategoryListItemProps) {


	return (
		<li>
			<div className={cn(styles['item-content'])}>
				<NavItem to={link} className={cn(styles['category'])}>
					<div className={cn(styles['list-item'], {
						[styles['border-item']]: borderItem
					}, className)} onMouseEnter={onMouseEnter ? () => onMouseEnter(name) : undefined}
					onMouseLeave={onMouseLeave}
					>
						{ children}			
					</div>
				</NavItem>
			
				{showSub && subcategory}
			</div>
			
		</li>
				
	);
}

export default CategoryListItem;