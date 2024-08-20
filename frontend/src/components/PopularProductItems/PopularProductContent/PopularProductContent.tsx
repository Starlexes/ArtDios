import styles from './PopularProductContent.module.css';
import { PopularProductContentProps } from './PopularProductContent.props';
import cn from 'classnames';


function PopularProductContent({isPromo, children, className }: PopularProductContentProps) {
	
	return (	
		<div className={cn(styles['product-content'], {
			[styles['promo-content']] : isPromo
		}, className)}>
			{children}
		</div>	
	);

}

export default PopularProductContent;