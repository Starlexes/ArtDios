
import { leftArrowImage, rightArrowImage } from '../../../utils/constants';
import Button from '../../Header/Button/Button';
import styles from './ProductCardArrowButton.module.css';
import { ProductCardArrowButtonProps } from './ProductCardArrowButton.props';
import cn from 'classnames';

function ProductCardArrowButton({className, typeArrow, ...props}: ProductCardArrowButtonProps) {
	return (
		
		<Button className={cn(styles['arrow-btn'], className)} {...props}>
			{typeArrow === 'left'? leftArrowImage(): rightArrowImage()}
		</Button>

	);
}

export default ProductCardArrowButton;