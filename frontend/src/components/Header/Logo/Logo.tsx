
import styles from './Logo.module.css';
import { LogoProps } from './Logo.props';
import NavItem from '../NavItem/NavItem';
import LogoImage from '../LogoImage/LogoImage';
import cn from 'classnames';

function Logo({className}: LogoProps) {
	return (
		<div className={cn(styles, className)}>
			<NavItem href='#' className='logo-link'>
				<LogoImage />
			</NavItem>
		</div>
	);
}

export default Logo;