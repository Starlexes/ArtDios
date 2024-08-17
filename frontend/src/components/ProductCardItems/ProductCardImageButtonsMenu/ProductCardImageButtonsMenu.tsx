
import styles from './ProductCardImageButtonsMenu.module.css';
import { ProductCardImageButtonsMenuProps } from './ProductCardImageButtonsMenu.props';
import cn from 'classnames';

function ProductCardImageButtonsMenu({className, children}: ProductCardImageButtonsMenuProps) {

	
	return (
			
		<div className={cn(styles['images-btn'], className)}>
			{children}
		</div>

	);
}

export default ProductCardImageButtonsMenu;