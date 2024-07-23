import styles from './Footer.module.css';
import { FooterProps } from './Footer.props';

function Footer({children, className}: FooterProps) {
	return (
		<footer className={className}>
			{children}
		</footer>
	);
}

export default Footer;