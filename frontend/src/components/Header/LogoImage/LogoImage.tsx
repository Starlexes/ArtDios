
import styles from './LogoImage.module.css';
import { LogoImageProps } from './LogoImage.props';
import LogoText from '../LogoText/LogoText';
import cn from 'classnames';

function LogoImage({className}: LogoImageProps) {
	return (
		<div className={cn(styles['logos'], className)}>
			<img src="/artdios-logo.png" alt="АРТДИОС logo"/>
			<LogoText>Магазин материалов для<br/>отделки помещений</LogoText> 
		</div>
		
	);
}

export default LogoImage;