import styles from './GalleryTitle.module.css';
import { GalleryTitleProps } from './GalleryTitle.props';
import cn from 'classnames';


function GalleryTitle({ className, children }: GalleryTitleProps) {
	
	return (
		
		<h3 className={cn(styles['gallery-title'], className)}>
			{children}
		</h3>

	);

}

export default GalleryTitle;