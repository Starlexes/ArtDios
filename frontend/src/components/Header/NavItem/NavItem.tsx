import { Link } from 'react-router-dom';
import styles from './NavItem.module.css';
import { NavItemProps } from './NavItem.props';
import cn from 'classnames';


function NavItem({children, className, to,...props}: NavItemProps) {
	return (
		
		<Link to={to} className={cn(styles['contact__header'], {
			[styles['contact-text']]: className === 'contact-text',
			[styles['phone-num']]: className === 'phone-num',
			
			[styles['logo-link']]: className === 'logo-link',
			[styles['nav-menu']]: className === 'nav-menu',
			[styles['nav-footer']]: className === 'nav-footer',
			[styles['category']]: className === 'category',
			[styles['modal-label']]: className === 'modal-label'
		}, className)} {...props}>{children}
		</Link>
		
	);
}

export default NavItem;