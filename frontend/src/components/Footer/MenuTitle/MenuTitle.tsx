import styles from './MenuTitle.module.css';
import { MenuTitleProps } from './MenuTitle.props';
import cn from 'classnames';

function MenuTitle({children, ...props}: MenuTitleProps) {
	return (
		<span className={cn(styles['menu-title'])} {...props}>
			{children}
		</span>
	);
}

export default MenuTitle;