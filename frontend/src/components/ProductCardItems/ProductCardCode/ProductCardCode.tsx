import styles from './ProductCardCode.module.css';
import cn from 'classnames';
import { ProductCardCodeProps } from './ProductCardCode.props';

function ProductCardCode({className, children}: ProductCardCodeProps) {

	return (	
		<span className={cn(styles['code-card'], className)}>Код товара: {children}</span>
	);
}

export default ProductCardCode;