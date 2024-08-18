import styles from './GalleryImage.module.css';
import { GalleryImageProps } from './GalleryImage.props';
import cn from 'classnames';


function GalleryImage({children, type, className }: GalleryImageProps) {
	
	return (
		
		<div className={cn(styles['gallery-image'], {
			[styles['left']]: type === 'even',
			[styles['right']]: type === 'odd'
		}, className)}>
			{children}
		</div>	

	);

}

export default GalleryImage;