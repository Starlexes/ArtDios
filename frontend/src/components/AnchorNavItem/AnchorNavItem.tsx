
import styles from './AnchorNavItem.module.css';
import { AnchorNavItemProps } from './AnchorNavItem.props';
import cn from 'classnames';


function AnchorNavItem({children, className, href,...props}: AnchorNavItemProps) {
	return (
		
		<a href={href} className={cn(styles['nav-item'], className)} {...props}>{children}
		</a>
		
	);
}

export default AnchorNavItem;