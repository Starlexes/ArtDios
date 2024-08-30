import styles from './PopularProductItem.module.css';
import { PopularProductItemProps } from './PopularProductItem.props';
import cn from 'classnames';


function PopularProductItem({children, className, ...props }: PopularProductItemProps) {
	
	return (	
		<div className={cn(styles['product-item'], className)} {...props}>
			{children}
		</div>	
	);

}

export default PopularProductItem;