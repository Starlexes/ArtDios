import styles from './ItemCardInputLabel.module.css';
import { ItemCardInputLabelProps } from './ItemCardInputLabel.props';
import cn from 'classnames';


function ItemCardInputLabel({ className, children}: ItemCardInputLabelProps) {

	return (		
		<label htmlFor='item-property' className={cn(styles['input-title'], className)}>		
			{children}		
		</label>        
	);

}

export default ItemCardInputLabel;