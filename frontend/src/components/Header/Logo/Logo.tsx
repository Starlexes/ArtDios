
import styles from './Logo.module.css';
import { LogoProps } from './Logo.props';
import NavItem from '../NavItem/NavItem';
import LogoImage from '../LogoImage/LogoImage';
import cn from 'classnames';

function Logo({isFooter, className, onClick}: LogoProps) {
	return (
		<div className={cn(styles['main-logo'], className)} onClick={onClick}>
			<NavItem to='/' className={cn(styles['logo-link'])}>
				<LogoImage isFooter={isFooter}/>
			</NavItem>
		</div>
	);
}

export default Logo;