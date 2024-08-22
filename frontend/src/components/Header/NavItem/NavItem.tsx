import { Link } from 'react-router-dom';
import styles from './NavItem.module.css';
import { NavItemProps } from './NavItem.props';
import { HashLink } from 'react-router-hash-link';
import cn from 'classnames';


function NavItem({children, className, to, isHashLink=false, ...props}: NavItemProps) {
	return (
		isHashLink?  
			
			<HashLink smooth to={to} className={cn(styles['contact__header'], {
				[styles['contact-text']]: className === 'contact-text'
					
			}, className)} {...props}>
				{children}
			</HashLink>
			
			: 
			<Link to={to} className={cn(styles['contact__header'], {
				[styles['contact-text']]: className === 'contact-text'
					
			}, className)} {...props}>{children}
			</Link>
	);
}

export default NavItem;