
import styles from './ItemImagePreview.module.css';
import { ItemImagePreviewProps } from './ItemImagePreview.props';
import cn from 'classnames';
import ImageUploader from '../ImageUploader/ImageUploader';
import axios from 'axios';


function ItemImagePreview({ className, image, onChange, errors,
	title, imageClassName, isShowInput=true, dark=false}: ItemImagePreviewProps) {

	const url = image? image instanceof File? URL.createObjectURL(image):
		axios.defaults.baseURL+image: null;

	return (
		
		<div className={cn(styles['image-preview'], {
			[styles['errors']]: errors,
			[styles['dark']]: dark
		}, className)}>
		
			
			<div className={cn(styles['image'], imageClassName)}>{url && (
				<img src={url} alt="Предпросмотр" />
			)
			}
			</div>
			
			{ isShowInput &&
				<>
					<span className={cn(styles['image-text'])}>{title? title: 'Изображение:'}</span>
					<ImageUploader dark={!dark} onChange={onChange}/>
				</>
			}
		
		</div>
           
	);

}

export default ItemImagePreview;