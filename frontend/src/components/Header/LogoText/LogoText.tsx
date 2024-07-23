
import styles from './LogoText.module.css';
import { LogoTextProps } from './LogoText.props';
import cn from 'classnames';

function LogoText({className, children}: LogoTextProps) {
	return (
		<div className={cn(styles['logo-two'], className)}>
			{children}
		</div>
	);
}

export default LogoText;