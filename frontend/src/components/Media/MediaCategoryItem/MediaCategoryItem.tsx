
import styles from './MediaCategoryItem.module.css';
import { MediaCategoryItemProps } from './MediaCategoryItem.props';
import cn from 'classnames';

function MediaCategoryItem({ className,
	children, 
	borderItem, onClick}: MediaCategoryItemProps) {

	return (
		<li>
			
			<div className={cn(styles['list-item'], {
				[styles['border-item']]: borderItem
			}, className)} onClick={onClick}
			>
				{ children}			
			</div>
		

			
		</li>
				
	);
}

export default MediaCategoryItem;