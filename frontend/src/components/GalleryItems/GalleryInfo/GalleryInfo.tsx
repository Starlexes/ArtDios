import styles from './GalleryInfo.module.css';
import { GalleryInfoProps } from './GalleryInfo.props';
import cn from 'classnames';


function GalleryInfo({children, className }: GalleryInfoProps) {
	
	return (
		
		<div className={cn(styles['gallery-item'], className)}>
			{children}
		</div>	

	);

}

export default GalleryInfo;