import LinkMenu from '../../components/Header/LinkMenu/LinkMenu';
import Navigation from '../../components/Header/Navigation/Navigation';
import TopPanel from '../../components/Header/TopPanel/TopPanel';
import styles from './Header.module.css';
import cn from 'classnames';


function Header() {
	return (
		<header className={cn(styles['header'])}>
			<Navigation/>
			<TopPanel/>
			<LinkMenu/>
		</header>
	);
}

export default Header;