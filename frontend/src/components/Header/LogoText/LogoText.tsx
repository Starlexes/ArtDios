
import styles from './LogoText.module.css';
import { LogoTextProps } from './LogoText.props';
import cn from 'classnames';

function LogoText({isFooter, className, children}: LogoTextProps) {
	return (
		<div className={cn(styles['logo-two'],{
			[styles['logo-footer']]: isFooter
		}, className)}>
			{children}
		</div>
	);
}

export default LogoText;