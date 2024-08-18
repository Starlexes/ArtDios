import styles from './GalleryDesc.module.css';
import { GalleryDescProps } from './GalleryDesc.props';
import cn from 'classnames';


function GalleryDesc({children, className }: GalleryDescProps) {
	
	return (
		
		<p className={cn(styles['gallery-desc'], className)}>
			{children}
		</p>	

	);

}

export default GalleryDesc;