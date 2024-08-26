
import styles from './LogoImage.module.css';
import { LogoImageProps } from './LogoImage.props';
import LogoText from '../LogoText/LogoText';
import cn from 'classnames';
import { mediaImagesPath } from '../../../utils/constants';

function LogoImage({isFooter, className}: LogoImageProps) {
	return (
		<div className={cn(styles['logos'], {
			[styles['logo-footer']]: isFooter
		}, className)}>
			<img src={mediaImagesPath+'/artdios-logo.png'} alt="АРТДИОС logo"/>
			<LogoText isFooter={isFooter}>Магазин материалов для отделки помещений</LogoText> 
		</div>
		
	);
}

export default LogoImage;