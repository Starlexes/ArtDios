import Input from '../../components/Header/Input/Input';
import styles from './ImageUploader.module.css';
import { ImageUploaderProps } from './ImageUploader.props';
import cn from 'classnames';


function ImageUploader({ className, dark=true, ...props}: ImageUploaderProps) {

	return (
		<div className={cn(styles['file-upload'], {
			[styles['light']]: !dark
		}, className)}>
			<span className={cn(styles['upload-text'])}>Добавить +</span>
			<Input type='file' {...props} accept="image/*"/>
             
		</div>
		
           
	);

}

export default ImageUploader;