
import styles from './PromoLabel.module.css';
import { PromoLabelProps } from './PromoLabel.props';
import cn from 'classnames';

function PromoLabel({ className }: PromoLabelProps) {
	
	return (
		<div className={cn(styles['promo-label'], className)}>
			Скидка
		</div>
	);
}

export default PromoLabel;