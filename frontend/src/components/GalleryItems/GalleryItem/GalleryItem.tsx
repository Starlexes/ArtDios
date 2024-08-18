import axios from 'axios';
import GalleryDesc from '../GalleryDesc/GalleryDesc';
import GalleryImage from '../GalleryImage/GalleryImage';
import GalleryInfo from '../GalleryInfo/GalleryInfo';
import GalleryTitle from '../GalleryTitle/GalleryTitle';
import styles from './GalleryItem.module.css';
import { GalleryItemProps } from './GalleryItem.props';
import cn from 'classnames';


function GalleryItem({gallery, type, className }: GalleryItemProps) {
	
	return (
		
		<div className={cn(styles['gallery-item'], {
			[styles['left']]: type === 'even',
			[styles['right']]: type === 'odd'
		}, className)}>
		
			<GalleryImage type={type}>
				<img src={axios.defaults.baseURL+gallery.image} alt={gallery.name} />				   
			</GalleryImage>  
			<GalleryInfo>
				<GalleryTitle>
					{gallery.name}
				</GalleryTitle>
                        
				<GalleryDesc>
					{gallery.description}
				</GalleryDesc>
			</GalleryInfo>
			
			
		</div>	

	);

}

export default GalleryItem;