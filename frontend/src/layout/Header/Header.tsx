//import styles from './Header.module.css';
import { HeaderProps } from './Header.props';

function Header({children, className}: HeaderProps) {
	return (
		<header className={className}>
			{children}
		</header>
	);
}

export default Header;