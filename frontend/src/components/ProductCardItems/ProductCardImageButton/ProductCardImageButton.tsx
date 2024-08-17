
import Button from '../../Header/Button/Button';
import styles from './ProductCardImageButton.module.css';
import { ProductCardImageButtonProps } from './ProductCardImageButton.props';
import cn from 'classnames';

function ProductCardImageButton({className, imageName, imagePath, ...props}: ProductCardImageButtonProps) {
	return (
		
		<Button className={cn(styles['image-btn'], className)} {...props}>
			<img src={imagePath} alt={imageName} />
		</Button>

	);
}

export default ProductCardImageButton;