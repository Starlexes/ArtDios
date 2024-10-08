
import ButtonOrderCall from '../../ButtonOrderCall/ButtonOrderCall';
import styles from './ProductOrder.module.css';
import { ProductOrderProps } from './ProductOrder.props';
import cn from 'classnames';

function ProductOrder({children, className, onClickProductOrder, commentPlaceholder }: ProductOrderProps) {
	return (
		<ButtonOrderCall className={cn(styles['order-btn'], className)}
			isProduct={true}
			onClickProductOrder={onClickProductOrder}
			commentPlaceholder={commentPlaceholder}>
			{children}
		</ButtonOrderCall>
	);
}

export default ProductOrder;