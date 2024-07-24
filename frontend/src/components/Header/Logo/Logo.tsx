
import styles from './Logo.module.css';
import { LogoProps } from './Logo.props';
import NavItem from '../NavItem/NavItem';
import LogoImage from '../LogoImage/LogoImage';
import cn from 'classnames';

function Logo({isFooter, className}: LogoProps) {
	return (
		<div className={cn(styles['logo-link'], {
			[styles['logo-footer']]: className === 'logo-footer'
		})}>
			<NavItem href='#' className='logo-link'>
				<LogoImage isFooter={isFooter}/>
			</NavItem>
		</div>
	);
}

export default Logo;