import styles from './NavItem.module.css';
import { NavItemProps } from './NavItem.props';
import cn from 'classnames';


function NavItem({children, className, href,...props}: NavItemProps) {
	return (
		
		<a href={href} className={cn(styles['contact__header'], {
			[styles['contact-text']]: className === 'contact-text',
			[styles['phone-num']]: className === 'phone-num',
			[styles['social-item']]: className === 'social-item',
			[styles['logo-link']]: className === 'logo-link',
			[styles['nav-menu']]: className === 'nav-menu',
			[styles['nav-footer']]: className === 'nav-footer'
		})} {...props}>{children}</a>
		
	);
}

export default NavItem;