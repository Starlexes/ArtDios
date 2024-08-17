import styles from './ProductCardAbout.module.css';
import cn from 'classnames';
import { ProductCardAboutProps } from './ProductCardAbout.props';

function ProductCardAbout({className, children}: ProductCardAboutProps) {

	return (	
		<div className={cn(styles['about-card'], className)}>{children}</div>
	);
}

export default ProductCardAbout;