import styles from './MenuFooterItem.module.css';
import { MenuFooterItemProps } from './MenuFooterItem.props';
import cn from 'classnames';

function MenuFooterItem({children, className, ...props }: MenuFooterItemProps) {
	return (
		<div className={cn(styles['menu-item'], className)} {...props}>
			{children}
		</div>
	);
}

export default MenuFooterItem;