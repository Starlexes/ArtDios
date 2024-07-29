import { memo } from 'react';
import MenuFooter from '../../components/Footer/MenuFooter/MenuFooter';
import NavFooter from '../../components/Footer/NavFooter/NavFooter';
import styles from './Footer.module.css';
import cn from 'classnames';

const Footer = memo(function Footer() {
	return (
		<footer className={cn(styles['footer'])}>
			
			<MenuFooter/>
			
			<NavFooter/>
			
		</footer>
	);
});

export default Footer;